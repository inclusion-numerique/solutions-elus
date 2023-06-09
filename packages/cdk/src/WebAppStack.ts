import { Fn, TerraformStack } from 'cdktf'
import { Construct } from 'constructs'
import { ScalewayProvider } from '@sde/scaleway/provider'
import { RdbDatabase } from '@sde/scaleway/rdb-database'
import { DataScalewayRdbInstance } from '@sde/scaleway/data-scaleway-rdb-instance'
import { RdbUser } from '@sde/scaleway/rdb-user'
import { RdbPrivilege } from '@sde/scaleway/rdb-privilege'
import { DataScalewayContainerNamespace } from '@sde/scaleway/data-scaleway-container-namespace'
import { Container } from '@sde/scaleway/container'
import { WebCdkOutput } from '@sde/cdk/getCdkOutput'
import { DataScalewayDomainZone } from '@sde/scaleway/data-scaleway-domain-zone'
import { DomainRecord, DomainRecordConfig } from '@sde/scaleway/domain-record'
import { ContainerDomain } from '@sde/scaleway/container-domain'
import {
  computeBranchNamespace,
  createPreviewSubdomain,
  namespacer,
} from '@sde/cdk/utils'
import { ObjectBucket } from '@sde/scaleway/object-bucket'
import {
  containerNamespaceName,
  databaseInstanceName,
  mainDomain,
  previewDomain,
  projectSlug,
  projectTitle,
  region,
} from '@sde/config/config'
import { environmentVariablesFromList } from '@sde/cdk/environmentVariable'
import { createOutput } from '@sde/cdk/output'
import { terraformBackend } from '@sde/cdk/terraformBackend'

export const webAppStackVariables = [
  'WEB_CONTAINER_IMAGE',
  'SCW_DEFAULT_ORGANIZATION_ID',
  'SCW_PROJECT_ID',
] as const
export const webAppStackSensitiveVariables = [
  'SCW_ACCESS_KEY',
  'SCW_SECRET_KEY',
  'DATABASE_PASSWORD',
] as const

/**
 * This stack represents the web app for a given branch (namespace).
 * It can be deployed for each branch.
 */
export class WebAppStack extends TerraformStack {
  constructor(scope: Construct, branch: string) {
    super(scope, 'web')

    const namespace = computeBranchNamespace(branch)

    const namespaced = namespacer(namespace)

    // ⚠️ When calling this function, do not forget to update typings in src/getCdkOutput.ts
    const output = createOutput<WebCdkOutput>(this)

    const isMain = namespace === 'main'

    const { hostname, subdomain } = isMain
      ? { hostname: mainDomain, subdomain: '' }
      : createPreviewSubdomain(namespace, previewDomain)

    const environmentVariables = environmentVariablesFromList(
      this,
      webAppStackVariables,
      { sensitive: false },
    )
    const sensitiveEnvironmentVariables = environmentVariablesFromList(
      this,
      webAppStackSensitiveVariables,
      { sensitive: true },
    )

    // Configuring provider that will be used for the rest of the stack
    new ScalewayProvider(this, 'provider', {
      region,
      accessKey: sensitiveEnvironmentVariables.SCW_ACCESS_KEY.value,
      secretKey: sensitiveEnvironmentVariables.SCW_SECRET_KEY.value,
      organizationId: environmentVariables.SCW_DEFAULT_ORGANIZATION_ID.value,
      projectId: environmentVariables.SCW_PROJECT_ID.value,
    })

    // State of deployed infrastructure for each branch will be stored in the
    // same 'sde-terraform-state' bucket, with namespace in .tfstate filename.
    terraformBackend(this, `web-${namespace}`)

    // The database instance is shared for each namespace/branch we refer to it (DataScaleway)
    // but do not manage it through this stack
    const databaseInstance = new DataScalewayRdbInstance(this, 'dbInstance', {
      name: databaseInstanceName,
    })

    output('databaseHost', databaseInstance.endpointIp)
    output('databasePort', databaseInstance.endpointPort)

    const databaseName = namespaced(projectSlug)
    const databaseUser = namespaced(projectSlug)
    const databasePasswordVariable =
      sensitiveEnvironmentVariables.DATABASE_PASSWORD

    const rdbDatabaseUser = new RdbUser(this, 'databaseUser', {
      name: databaseUser,
      instanceId: databaseInstance.instanceId,
      password: databasePasswordVariable.value,
    })

    const database = new RdbDatabase(this, 'database', {
      name: databaseName,
      instanceId: databaseInstance.instanceId,
    })

    output('databaseUser', databaseUser)
    output('databaseName', databaseName)

    new RdbPrivilege(this, 'databasePrivilege', {
      instanceId: databaseInstance.instanceId,
      databaseName,
      userName: databaseUser,
      permission: 'all',
      dependsOn: [database, rdbDatabaseUser],
    })

    const documentsBucket = new ObjectBucket(this, 'documents', {
      name: namespaced(`${projectSlug}-documents`),
      corsRule: [
        {
          allowedHeaders: ['*'],
          allowedMethods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
          maxAgeSeconds: 3000,
          exposeHeaders: ['Etag'],
          allowedOrigins: [`https://${hostname}`],
        },
      ],
    })

    output('documentsBucketName', documentsBucket.name)
    output('documentsBucketEndpoint', documentsBucket.endpoint)

    const containerNamespace = new DataScalewayContainerNamespace(
      this,
      'containerNamespace',
      { name: containerNamespaceName },
    )

    const emailFromAddress = isMain
      ? `bot@${mainDomain}`
      : `bot+${namespace}@${mainDomain}`

    const emailFromName = isMain
      ? projectTitle
      : `[${namespace}] ${projectTitle}`

    const databaseUrl = Fn.format('postgres://%s:%s@%s:%s/%s', [
      databaseUser,
      databasePasswordVariable.value,
      databaseInstance.endpointIp,
      databaseInstance.endpointPort,
      databaseName,
    ])

    // Changing the name will recreate a new container
    // The names fails with max length so we shorten it
    const maxContainerNameLength = 34
    const containerName =
      namespace.length > maxContainerNameLength
        ? namespace.slice(0, Math.max(0, maxContainerNameLength))
        : namespace

    const container = new Container(this, 'webContainer', {
      namespaceId: containerNamespace.namespaceId,
      registryImage: environmentVariables.WEB_CONTAINER_IMAGE.value,
      environmentVariables: {
        EMAIL_FROM_ADDRESS: emailFromAddress,
        EMAIL_FROM_NAME: emailFromName,
        SDE_WEB_IMAGE: environmentVariables.WEB_CONTAINER_IMAGE.value,
        DOCUMENTS_BUCKET: documentsBucket.name,
        BASE_URL: hostname,
        BRANCH: branch,
        NAMESPACE: namespace,
        // This env variable is reserved at the level of container namespace. We inject it here even if its shared.
        SCW_DEFAULT_REGION: region,
        NEXT_PUBLIC_SENTRY_ENVIRONMENT: namespace,
      },
      secretEnvironmentVariables: {
        DATABASE_URL: databaseUrl,
      },
      name: containerName,
      minScale: isMain ? 2 : namespace === 'dev' ? 1 : 0,
      maxScale: isMain ? 5 : 1,
      cpuLimit: 1120, // mVPCU
      memoryLimit: 2048, // mB
      deploy: true,
    })

    const rootZone = new DataScalewayDomainZone(this, 'dnsZone', {
      domain: isMain ? mainDomain : previewDomain,
    })

    const webDnsRecordConfig: DomainRecordConfig = subdomain
      ? {
          type: 'CNAME',
          dnsZone: rootZone.domain,
          name: subdomain,
          data: `${container.domainName}.`,
          ttl: 60 * 5,
        }
      : {
          // Root domain record cannot be CNAME
          type: 'ALIAS',
          dnsZone: rootZone.domain,
          name: '',
          data: `${container.domainName}.`,
          ttl: 60 * 5,
        }

    const webDnsRecord = new DomainRecord(
      this,
      'webDnsRecord',
      webDnsRecordConfig,
    )

    new ContainerDomain(this, 'webContainerDomain', {
      containerId: container.id,
      hostname,
      dependsOn: [webDnsRecord, container],
    })

    output('webBaseUrl', hostname)
    output('containerDomainName', container.domainName)
    output('databaseUrl', databaseUrl, 'sensitive')
    output('databasePassword', databasePasswordVariable.value, 'sensitive')
    output(
      'webContainerStatus',
      container.status as WebCdkOutput['webContainerStatus'],
    )
    output('webContainerId', container.id)
    output('webContainerImage', environmentVariables.WEB_CONTAINER_IMAGE.value)
  }
}
