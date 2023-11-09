import { mainLiveUrl, projectTitle, projectDescription, repositoryUrl } from '@sde/config/config'

const NodeEnvironment = process.env.NODE_ENV

/**
 * Necessary environment variables for web app are listed here.
 */

/**
 * Only use ServerWebAppConfig on server side
 * It contains secrets that must not be sent to the client
 */

const emailServer = `smtp://${process.env.SMTP_USERNAME ?? ''}:${
  process.env.SMTP_PASSWORD ?? ''
}@${process.env.SMTP_SERVER ?? ''}:${process.env.SMTP_PORT ?? ''}`

export const ServerWebAppConfig = {
  NodeEnv: NodeEnvironment,
  Branch: process.env.BRANCH ?? '',
  Namespace: process.env.NAMESPACE ?? '',
  isMain: process.env.BRANCH === 'main',
  Chromatic: {
    appId: process.env.CHROMATIC_APP_ID ?? '',
  },
  Auth: {
    Email: {
      server: emailServer,
      from: `${process.env.EMAIL_FROM_NAME ?? ''} <${
        process.env.EMAIL_FROM_ADDRESS ?? ''
      }>`,
    },
  },
  Grist: {
    apiKey: process.env.GRIST_API_KEY ?? '',
    documentId: process.env.GRIST_DOCUMENT_ID ?? '',
    tableId: process.env.GRIST_TABLE_ID ?? '',
    localisationTableId: process.env.GRIST_LOCALISATION_TABLE_ID ?? '',
    programTableId: process.env.GRIST_PROGRAM_TABLE_ID ?? '',
    thematiqueTableId: process.env.GRIST_THEMATIQUE_TABLE_ID ?? '',
  },
  S3: {
    documentsBucket: process.env.DOCUMENTS_BUCKET ?? '',
    host: process.env.S3_HOST ?? '',
    region: process.env.SCW_DEFAULT_REGION ?? '',
    accessKey: process.env.SCW_ACCESS_KEY ?? '',
    secretKey: process.env.SCW_SECRET_KEY ?? '',
  },
  Cockpit: {
    metricsUrl: process.env.COCKPIT_METRICS_URL ?? '',
    logsUrl: process.env.COCKPIT_LOGS_URL ?? '',
    alertManagerUrl: process.env.COCKPIT_ALERT_MANAGER_URL ?? '',
    grafanaUrl: process.env.COCKPIT_GRAFANA_URL ?? '',
  },
}

/**
 * Public config can be used on client side or server side
 */

export const PublicWebAppConfig = {
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  projectTitle,
  projectDescription,
  mainLiveUrl,
  repository: repositoryUrl,
  disableLinkPrefetch:
    NodeEnvironment === 'development' &&
    process.env.NEXT_PUBLIC_DEVELOPMENT_DISABLE_LINK_PREFETCH === 'true',
  Sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? 'local',
  },
}
