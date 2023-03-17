import { ServerWebAppConfig } from '@sde/web/webAppConfig'
import {ZodObject} from 'zod'
import axios from 'axios'
import FormData from 'form-data'
import { output } from '@sde/cli/output'
import { convertGristProjectToModel, convertGristProgramToModel, convertGristLocalisationToModel } from './convertGristProjectToModel'
import { grisLocalisationValidation, grisProgramValidation, GristLocalisation, GristProgram, GristProject, GristProjectFields, gristProjectFieldsValidation, gristProjectValidation, gristRecordsResponse } from './grist.type'


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

export const createProjectRecords = async (data: GristProjectFields[]): Promise<void> => {

  const parsedData = data.map((item) => gristProjectFieldsValidation.parse(item))

  const url = `https://grist.incubateur.anct.gouv.fr/api/docs/${ServerWebAppConfig.Grist.documentId}/tables/${ServerWebAppConfig.Grist.tableId}/records`

  const payload = { records: parsedData.map(fields => ({ fields })) }

  await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${ServerWebAppConfig.Grist.apiKey}`,
    },
  })
}

const listRecords = async <T>(table: string, validation: ZodObject<any>): Promise<T[]> => {
  const url = `https://grist.incubateur.anct.gouv.fr/api/docs/${ServerWebAppConfig.Grist.documentId}/tables/${table}/records`

  const response = await axios.get<{ records: unknown[] }>(url, {
    params: {
      limit: 5000,
    },
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

export const listPrograms = async (): Promise<GristProgram[]> => listRecords(ServerWebAppConfig.Grist.programTableId, grisProgramValidation)

export const listLocalisations = async (): Promise<GristLocalisation[]> => listRecords(ServerWebAppConfig.Grist.localisationTableId, grisLocalisationValidation)

export const listProjectRecords = async (): Promise<GristProject[]> => listRecords(ServerWebAppConfig.Grist.tableId, gristProjectValidation)

export const insertInDataBase = async (projects: GristProject[], localisations: GristLocalisation[], programs: GristProgram[]) => {
  if (!prismaClient) {
    return
  }

  // For now we delete every existing projects, we'll see later for an update
  await prismaClient.$transaction([
    prismaClient.localization.deleteMany(),
    prismaClient.program.deleteMany(),
    prismaClient.project.deleteMany(),
    prismaClient.localization.createMany({
      data: convertGristLocalisationToModel(localisations),
      skipDuplicates: true
    }),
    prismaClient.program.createMany({
      data: convertGristProgramToModel(programs),
      skipDuplicates: true
    }),
    /* prismaClient.project.createMany({
      data: convertGristProjectToModel(projects),
      skipDuplicates: true
    }) */
  ])
} 
