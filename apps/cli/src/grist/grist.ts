import fs from 'node:fs'
import { resolve } from 'node:path'
import { ZodObject } from 'zod'
import axios from 'axios'
import FormData from 'form-data'
import { output } from '@sde/cli/output'
import { ServerWebAppConfig } from '@sde/web/webAppConfig'
import {
  convertGristProjectToModel,
  convertGristProgramToModel,
  convertGristLocalisationToModel,
} from './convertGristProjectToModel'
import {
  grisLocalisationValidation,
  grisProgramValidation,
  grisThematiqueValidation,
  GristLocalisation,
  GristProgram,
  GristProject,
  GristProjectFields,
  gristProjectFieldsValidation,
  gristProjectValidation,
  gristRecordsResponse,
  GristThematique,
} from './grist.type'

export const uploadAttachments = async (upload: FormData): Promise<number[]> =>
  new Promise<number[]>((resolve, reject) => {
    upload.submit(
      {
        protocol: 'https:',
        method: 'post',
        host: 'grist.incubateur.anct.gouv.fr',
        path: `/api/docs/${ServerWebAppConfig.Grist.documentId}/attachments`,
        headers: upload.getHeaders({
          Authorization: `Bearer ${ServerWebAppConfig.Grist.apiKey}`,
        }),
      },
      async (error, response) => {
        if (error) {
          return reject(error)
        }

        if (response.statusCode !== 200) {
          return reject(
            new Error(
              `Error ${response.statusCode}: ${response.statusMessage}`,
            ),
          )
        }

        let body = ''
        response.on('data', (chunk) => {
          body += chunk
        })
        response.on('end', () => {
          resolve(JSON.parse(body))
        })
      },
    )
  })

export const createProjectRecords = async (
  data: GristProjectFields[],
): Promise<void> => {
  const parsedData = data.map((item) =>
    gristProjectFieldsValidation.parse(item),
  )

  const url = `https://grist.incubateur.anct.gouv.fr/api/docs/${ServerWebAppConfig.Grist.documentId}/tables/${ServerWebAppConfig.Grist.tableId}/records`

  const payload = { records: parsedData.map((fields) => ({ fields })) }

  await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${ServerWebAppConfig.Grist.apiKey}`,
    },
  })
}

const listRecords = async <T>(
  table: string,
  validation: ZodObject<any>,
): Promise<T[]> => {
  const url = `https://grist.incubateur.anct.gouv.fr/api/docs/${ServerWebAppConfig.Grist.documentId}/tables/${table}/records`

  const response = await axios.get<{ records: unknown[] }>(url, {
    headers: {
      Authorization: `Bearer ${ServerWebAppConfig.Grist.apiKey}`,
    },
  })

  /**
   * To be type safe and resistant to Grist changes in table structures, we parse input
   */
  const { records } = gristRecordsResponse.parse(response.data)

  const projects = records.map((record, index) => {
    const parsed = validation.safeParse(record)

    if (parsed.success) {
      return parsed.data as T
    }

    output(`Got invalid project record from Grist at index ${index}`)
    output(record)

    throw parsed.error
  })

  return projects
}

export const listThematiques = async (): Promise<GristThematique[]> =>
  listRecords(
    ServerWebAppConfig.Grist.thematiqueTableId,
    grisThematiqueValidation,
  )

export const listPrograms = async (): Promise<GristProgram[]> =>
  listRecords(ServerWebAppConfig.Grist.programTableId, grisProgramValidation)

export const listLocalisations = async (): Promise<GristLocalisation[]> =>
  listRecords(
    ServerWebAppConfig.Grist.localisationTableId,
    grisLocalisationValidation,
  )

export const listProjectRecords = async (): Promise<GristProject[]> =>
  listRecords(ServerWebAppConfig.Grist.tableId, gristProjectValidation)

const attachmentsPath = resolve(
  'apps',
  'web',
  'public',
  'images',
  'grist-attachments',
)
export const downloadAttachement = async (id: number) => {
  const url = `https://grist.incubateur.anct.gouv.fr/api/docs/${ServerWebAppConfig.Grist.documentId}/attachments/${id}/download`

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${ServerWebAppConfig.Grist.apiKey}`,
    },
    responseType: 'stream',
  })

  let fileName = id.toString()
  const fileNameHeader = response.headers['content-disposition'] as string
  if (fileNameHeader) {
    const values = fileNameHeader.split('.')
    if (values.length > 1) {
      fileName += `.${values[values.length - 1].replace('"', '')}`
    }
  }

  if (!fs.existsSync(attachmentsPath)) {
    fs.mkdirSync(attachmentsPath)
  }

  response.data.pipe(fs.createWriteStream(resolve(attachmentsPath, fileName)))
  return fileName
}

export const downloadAttachments = async (projects: GristProject[]) => {
  const toDownload = projects
    .flatMap((project) => [
      project.fields.Visuel,
      project.fields.Partenaire_1_image,
      project.fields.Partenaire_2_image,
      project.fields.Acteur_local_1_image,
      project.fields.Acteur_local_2_image,
    ])
    .filter(Boolean)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .map((data) => data[1])

  const fileNames = await Promise.all(
    toDownload.map((id) => downloadAttachement(id)),
  )
  const fileNamesById: Record<number, string> = {}
  for (const [index, id] of toDownload.entries()) {
    fileNamesById[id] = fileNames[index]
  }
  return fileNamesById
}

export const insertInDataBase = async (
  projects: GristProject[],
  localisations: GristLocalisation[],
  programs: GristProgram[],
  thematiques: GristThematique[],
  attachments: Record<number, string>,
) => {
  if (!prismaClient) {
    return
  }

  // For now we delete every existing projects, we'll see later for an update
  await prismaClient.$transaction([
    prismaClient.project.deleteMany(),
    prismaClient.localization.deleteMany(),
    prismaClient.program.deleteMany(),
    prismaClient.localization.createMany({
      data: convertGristLocalisationToModel(localisations),
      skipDuplicates: true,
    }),
    prismaClient.program.createMany({
      data: convertGristProgramToModel(programs),
      skipDuplicates: true,
    }),
    prismaClient.project.createMany({
      data: convertGristProjectToModel(projects, thematiques, attachments),
      skipDuplicates: true,
    }),
  ])
}
