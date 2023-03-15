import { ServerWebAppConfig } from '@sde/web/webAppConfig'
import axios from 'axios'
import FormData from 'form-data'

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
        response.on('data', function (chunk) {
          body += chunk
        })
        response.on('end', function () {
          resolve(JSON.parse(body))
        })
      },
    )
  })

export const createProjectRecord = async (data: unknown): Promise<void> => {
  const url = `https://grist.incubateur.anct.gouv.fr/api/docs/${ServerWebAppConfig.Grist.documentId}/tables/${ServerWebAppConfig.Grist.tableId}/records`

  const payload = { records: [{ fields: data }] }

  try {
    const result = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${ServerWebAppConfig.Grist.apiKey}`,
      },
    })
    console.log('RESULT', result)
  } catch (err) {
    // TODO Sentry / Email sur Mattermost
    // TODO Log data in case of Grist failure
    console.log('FAIL', err)
  }
}
