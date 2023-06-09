import { NextApiRequest, NextApiResponse } from 'next'
import { createSignedGetUrl } from '@sde/web/server/createSignedUrl'
import { ServerWebAppConfig } from '@sde/web/webAppConfig'

export type AttachmentGetApiResponse = { url: string }

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get info from body
    const { key } = req.body

    const { url } = await createSignedGetUrl({
      key,
      bucket: ServerWebAppConfig.S3.documentsBucket,
    })

    res.status(200).json({ url })
  } catch (error) {
    // TODO SENTRY
    console.error(error)
    res.status(400).json({ error: error as string })
  }
}
export default get
