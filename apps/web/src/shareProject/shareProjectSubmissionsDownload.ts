import { prismaClient } from '@sde/web/prismaClient'
import { getServerUrl } from '@sde/web/utils/baseUrl'
import { dashboardRootPath } from '@sde/web/dashboard/dashboard'

export const shareProjectSubmissionsCsvFilename = () =>
  `Solutions d'élus - Projets - ${new Date().toISOString().slice(0, 10)}.csv`

export const getLeadSubmissionsCsvFilename = () =>
  `Solutions d'élus - Contacts - ${new Date().toISOString().slice(0, 10)}.csv`

const projectsCsvHeaders = [
  'Référence',
  'Date',
  'Type de collectivité',
  'Collectivité',
  'Code postal',
  'Point de contact',
  'Qualité du point de contact',
  'Email',
  'Téléphone',
  'Domaine',
  'Solution',
  'Description',
  'Dates',
  'Partenaires',
  'Technique',
  'Pièces jointes',
  'Lien',
]

const leadsCsvHeaders = [
  'Référence',
  'Date',
  'Type de collectivité',
  'Collectivité',
  'Code postal',
  'Point de contact',
  'Email',
  'Téléphone',
  'Lien',
]

export const generateShareProjectSubmissionsData = async (): Promise<
  string[][]
> => {
  const rows = await prismaClient.shareProjectFormSubmission.findMany({
    include: { attachments: true, community: true },
  })

  return [
    projectsCsvHeaders,
    ...rows.map(
      ({
        reference,
        created,
        community,
        name,
        quality,
        email,
        phone,
        domain,
        solution,
        description,
        dates,
        partners,
        tech,
        attachments,
      }) => [
        reference,
        created.toISOString(),
        community.scale,
        community.name,
        community.zipcodes.join(', '),
        name,
        quality,
        email,
        phone ?? '',
        domain,
        solution,
        description,
        dates,
        partners,
        tech,
        attachments.length.toString(),
        `${getServerUrl(`${dashboardRootPath}/projets/${reference}`)}`,
      ],
    ),
  ]
}

export const generateGetLeadSubmissionsData = async (): Promise<
  string[][]
> => {
  const rows = await prismaClient.getLeadFormSubmission.findMany({
    include: { community: true },
  })

  return [
    leadsCsvHeaders,
    ...rows.map(
      ({
        reference,
        created,
        community,
        name,
        email,
        phone,
      }) => [
        reference,
        created.toISOString(),
        community.scale,
        community.name,
        community.zipcodes.join(', '),
        name,
        email,
        phone ?? '',
        `${getServerUrl(`${dashboardRootPath}/contacts/${reference}`)}`,
      ],
    ),
  ]
}
