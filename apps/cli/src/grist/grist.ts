import { ServerWebAppConfig } from '@sde/web/webAppConfig'
import axios from 'axios'
import FormData from 'form-data'

export type GristProject = {
  id: number,
  fields: {
    Programme: number,
    Localisation:  number,
    Titre: string,
    Sous_titre: string,
    // TODO Type this
    // e.g. Visuel: [ 'L', 6 ],
    Visuel: unknown[],
    // TODO Type this
    // e.g. [ 'L', 2, 6, 3, 1, 8 ]
    Thematiques: unknown[],
    Specificites: string,
    Objectifs: string,
    Texte: string,
    Budget: number|null,
    // TODO Type this
    // e.g. Acteur_local_1_image: [ 'L', 4 ],
    Acteur_local_1_image: unknown | null,
    Calendrier: number,
    Partenaires_et_cofinanceurs: string,
    Modifie_par:  string,
    Presentation_du_territoire:  string,
    Acteur_local_1_texte: string,
    Acteur_local_1_nom:  string,
    Acteur_local_2_texte:  string,
    Acteur_local_2_nom: string,
    // TODO Type this
    // e.g. Acteur_local_1_image: [ 'L', 4 ],
    Acteur_local_2_image: unknown|null,
    Le: number,
    // TODO Type this
    // e.g. Acteur_local_1_image: [ 'L', 4 ],
    Partenaire_1_image:  unknown|null,
    Partenaire_1_nom:  string|null,
    Partenaire_1_texte:  string|null,
    Type_de_collectivite: 'commune'|'departement'|'epci'|'region',
    Departement: string,
    Partenaire_2_nom: string|null,
    Partenaire_2_texte:string|null,
    // TODO Type this
    // e.g. Acteur_local_1_image: [ 'L', 4 ],
    Partenaire_2_image:unknown|null,
    Population: number,
    Region: string,
    Lattitude: number|null,
    Longitude: number|null
  }
}

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

export const createProjectRecord = async (data: unknown): Promise<void> => {
  const url = `https://grist.incubateur.anct.gouv.fr/api/docs/${ServerWebAppConfig.Grist.documentId}/tables/${ServerWebAppConfig.Grist.tableId}/records`

  const payload = { records: [{ fields: data }] }

 await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${ServerWebAppConfig.Grist.apiKey}`,
      },
    })
}

export const listProjectRecords = async () => {
  const url = `https://grist.incubateur.anct.gouv.fr/api/docs/${ServerWebAppConfig.Grist.documentId}/tables/${ServerWebAppConfig.Grist.tableId}/records`

  const response = await axios.get<{records: GristProject[]}>(url, {
    headers: {
      Authorization: `Bearer ${ServerWebAppConfig.Grist.apiKey}`,
    },
  })

  // TODO Match a zod schema so we are type safe AND resistant to changes on Grist side ?

  return response.data
}
