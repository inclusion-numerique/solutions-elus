import { ServerWebAppConfig } from '@sde/web/webAppConfig'
import axios from 'axios'
import FormData from 'form-data'
import z from 'zod'
import { output } from '@sde/cli/output'


const gristRecordsResponse = z.object({
  records: z.array(z.object({
    id: z.number(),
    fields: z.object({}).passthrough(),
  })),
})

// TODO Type this
// e.g. Visuel: [ 'L', 6 ],
const gristRelationshipValidation = z.tuple([z.string()]).rest(z.number())

const emptyStringToNull = <T>(value: T) => typeof value === 'string' && value.trim() === '' ? null : value
const gristNullableString = z.preprocess(emptyStringToNull, z.string().nullable())

const gristProjectFieldsValidation = z.object({
  drupal_id: gristNullableString,
  drupal_url: gristNullableString,
  Programme: z.number().int(),
  Localisation: z.number().int(),
  Titre: gristNullableString,
  Sous_titre: gristNullableString,
  // TODO Type this
  // e.g. Visuel: [ 'L', 6 ],
  Visuel: gristRelationshipValidation.nullable(),
  // TODO Type this
  // e.g. [ 'L', 2, 6, 3, 1, 8 ]
  Thematiques: gristRelationshipValidation.nullable(),
  Specificites: gristNullableString,
  Objectifs: gristNullableString,
  Texte: gristNullableString,
  Budget: z.number().int().nullable(),
  // TODO Type this
  // e.g. Acteur_local_1_image: [ 'L', 4 ],
  Acteur_local_1_image: gristRelationshipValidation.nullable(),
  Calendrier: z.number().int().nullable(),
  Partenaires_et_cofinanceurs: gristNullableString,
  Modifie_par: gristNullableString,
  Presentation_du_territoire: gristNullableString,
  Acteur_local_1_texte: gristNullableString,
  Acteur_local_1_nom: gristNullableString,
  Acteur_local_2_texte: gristNullableString,
  Acteur_local_2_nom: gristNullableString,
  // TODO Type this
  // e.g. Acteur_local_1_image: [ 'L', 4 ],
  Acteur_local_2_image: gristRelationshipValidation.nullable(),
  Le: z.number().nullable(),
  Cree_le: z.number().nullable(),
  // TODO Type this
  // e.g. Acteur_local_1_image: [ 'L', 4 ],
  Partenaire_1_image: gristRelationshipValidation.nullable(),
  Partenaire_1_nom: z.string().nullable(),
  Partenaire_1_texte: z.string().nullable(),
  Type_de_collectivite: z.preprocess(emptyStringToNull, z.enum(['commune', 'departement', 'epci', 'region']).nullable()),
  Departement: gristNullableString,
  Partenaire_2_nom: z.string().nullable(),
  Partenaire_2_texte: z.string().nullable(),
  // TODO Type this
  // e.g. Acteur_local_1_image: [ 'L', 4 ],
  Partenaire_2_image: gristRelationshipValidation.nullable(),
  Population: z.number().int(),
  Region: gristNullableString,
  Lattitude: z.number().int().nullable(),
  Longitude: z.number().int().nullable(),
})

const gristProjectValidation = z.object({
  id: z.number().int(),
  fields: gristProjectFieldsValidation,
})
export type GristProjectFields = z.infer<typeof gristProjectFieldsValidation>

export type GristProject = z.infer<typeof gristProjectValidation>

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

export const listProjectRecords = async (): Promise<GristProject[]> => {
  const url = `https://grist.incubateur.anct.gouv.fr/api/docs/${ServerWebAppConfig.Grist.documentId}/tables/${ServerWebAppConfig.Grist.tableId}/records`

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
    const parsed = gristProjectValidation.safeParse(record)

    if (parsed.success) {
      return parsed.data
    }

    output(`Got invalid project record from Grist at index ${index}`)
    output(record)

    throw parsed.error
  })

  return projects
}
