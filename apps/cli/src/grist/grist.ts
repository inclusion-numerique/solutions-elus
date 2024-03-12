import fs from 'node:fs'
import { resolve } from 'node:path'
import z, { ZodError, ZodType } from 'zod'
import axios from 'axios'
import FormData from 'form-data'
import { output } from '@sde/cli/output'
import { ServerWebAppConfig } from '@sde/web/webAppConfig'
import { chunk } from 'lodash'
import {
  convertGristLocalisationToModel,
  convertGristProgramToModel,
  convertGristProjectToModel,
  convertGristPageToModel,
} from './convertGristProjectToModel'
import {
  grisLocalisationValidation,
  grisProgramValidation,
  grisThematiqueValidation,
  GristLocalisation,
  GristPage,
  gristPageValidation,
  GristProgram,
  GristProject,
  GristProjectFields,
  gristProjectFieldsValidation,
  gristProjectValidation,
  gristRecordsResponse,
  GristThematique,
} from './grist.type'

export const uploadAttachments = async (upload: FormData): Promise<number[]> =>
  // eslint-disable-next-line @typescript-eslint/no-shadow
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
      (error, response) => {
        if (error) {
          reject(error)
          return
        }

        if (response.statusCode !== 200) {
          reject(
            new Error(
              `Error ${response.statusCode?.toString() ?? ''}: ${
                response.statusMessage ?? ''
              }`,
            ),
          )
          return
        }

        let body = ''
        response.on('data', (dataChunk) => {
          body += dataChunk
        })
        response.on('end', () => {
          resolve(JSON.parse(body) as number[])
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

export type ListRecordsOptions = {
  filter?: Record<string, (string | number | null | boolean)[]>
}
export type InvalidRecord = {
  data: { id: number; fields: Record<string, unknown> }
  error: ZodError
}

const listRecords = async <T extends ZodType>(
  table: string,
  validation: T,
  options?: ListRecordsOptions,
): Promise<{
  records: z.infer<T>[]
  invalidRecords: InvalidRecord[]
}> => {
  const url = `https://grist.incubateur.anct.gouv.fr/api/docs/${ServerWebAppConfig.Grist.documentId}/tables/${table}/records`

  const response = await axios.get<{ records: unknown[] }>(url, {
    params: {
      filter: options?.filter ? JSON.stringify(options.filter) : undefined,
    },
    headers: {
      Authorization: `Bearer ${ServerWebAppConfig.Grist.apiKey}`,
    },
  })

  /**
   * To be type safe and resistant to Grist changes in table structures, we parse input
   */
  const responseData = gristRecordsResponse.parse(response.data)

  const records: z.infer<T>[] = []
  const invalidRecords: InvalidRecord[] = []

  for (const maybeInvalidRecord of responseData.records) {
    const parsed = validation.safeParse(maybeInvalidRecord)

    if (parsed.success) {
      records.push(parsed.data as z.infer<T>)
      continue
    }

    output(
      `Got invalid project record from Grist. id: ${maybeInvalidRecord.id}`,
    )
    invalidRecords.push({ error: parsed.error, data: maybeInvalidRecord })
  }

  return { records, invalidRecords }
}

export const listThematiques = () =>
  listRecords(
    ServerWebAppConfig.Grist.thematiqueTableId,
    grisThematiqueValidation,
  )

export const listPrograms = () =>
  listRecords(ServerWebAppConfig.Grist.programTableId, grisProgramValidation)

export const listLocalisations = (options: ListRecordsOptions) =>
  listRecords(
    ServerWebAppConfig.Grist.localisationTableId,
    grisLocalisationValidation,
    options,
  )

export const listProjectRecords = () =>
  listRecords(ServerWebAppConfig.Grist.tableId, gristProjectValidation)

export const listPagesRecords = () =>
  listRecords(ServerWebAppConfig.Grist.pagesTableId, gristPageValidation)

const attachmentsPath = resolve(
  'apps',
  'web',
  'public',
  'images',
  'grist-attachments',
)
export const downloadAttachement = async (id: number) => {
  const url = `https://grist.incubateur.anct.gouv.fr/api/docs/${ServerWebAppConfig.Grist.documentId}/attachments/${id}/download`

  const response = await axios.get<NodeJS.ReadableStream>(url, {
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

  return { id, fileName }
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
    .flat()
    .filter((id): id is number => Number.isInteger(id))

  // We are getting 429 errors from Grist, so we need to handle operations by batch
  // Concurency limit is 10 but 5 is more conservative
  const batches = chunk(toDownload, 5)

  // Map of downloaded file names indexed by id
  const fileNames = new Map<number, string>()
  // Sequentially download batches
  for (const batch of batches) {
    // eslint-disable-next-line no-await-in-loop
    const batchFiles = await Promise.all(
      batch.map((id) => downloadAttachement(id)),
    )

    for (const { id, fileName } of batchFiles) {
      fileNames.set(id, fileName)
    }
  }

  return fileNames
}

export const insertInDataBase = async (
  projects: GristProject[],
  localisations: GristLocalisation[],
  programs: GristProgram[],
  thematiques: GristThematique[],
  attachments: Map<number, string>,
  pages: GristPage[],
) => {
  if (!prismaClient) {
    return
  }

  // For now we delete every existing projects, we'll see later for an update
  await prismaClient.$transaction([
    prismaClient.project.deleteMany(),
    prismaClient.localization.deleteMany(),
    prismaClient.program.deleteMany(),
    prismaClient.landingPageSEO.deleteMany(),

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
    prismaClient.landingPageSEO.createMany({
      data: convertGristPageToModel(pages),
      skipDuplicates: true,
    }),
  ])
}
