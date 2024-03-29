/**
 * Project configuration constants
 * ⚠️ Never put any secret value or authentication token in this file (or in any version controlled file)
 */
import { arrayFromEnvironmentVariable } from '@sde/config/arrayFromEnvironmentVariable'

export const projectTitle = "Solutions d'élus"
export const projectDescription = "Ensemble, partageons les solutions des territoires. Retrouvez ici les projets et réalisations des collectivités."
export const projectSlug = 'solutionsdelus'
export const mainLiveUrl = 'https://solutionsdelus.gouv.fr'
export const repositoryUrl = 'https://github.com/inclusion-numerique/solutions-elus'

export const databaseInstanceName = process.env.DATABASE_INSTANCE_NAME ?? ''
export const containerNamespaceName = process.env.CONTAINER_NAMESPACE_NAME ?? ''
export const region = process.env.SCW_DEFAULT_REGION ?? ''
export const mainDomain = process.env.MAIN_DOMAIN ?? ''
export const previewDomain = process.env.PREVIEW_DOMAIN ?? ''
export const chromaticAppId = process.env.CHROMATIC_APP_ID ?? ''
export const publicContactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''
export const publicSentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN ?? ''
export const nextTelemetryDisabled = process.env.NEXT_TELEMETRY_DISABLED ?? ''
export const sentryOrg = process.env.SENTRY_ORG ?? ''
export const sentryProject = process.env.SENTRY_PROJECT ?? ''
export const sentryUrl = process.env.SENTRY_URL ?? ''
export const smtpPort = process.env.SMTP_PORT ?? ''

export const cockpitGrafanaEditors = arrayFromEnvironmentVariable(
  process.env.COCKPIT_GRAPHANA_EDITORS,
)
export const cockpitGrafanaViewers = arrayFromEnvironmentVariable(
  process.env.COCKPIT_GRAPHANA_VIEWERS,
)
