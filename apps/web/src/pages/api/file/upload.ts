import { NextApiRequest, NextApiResponse } from 'next'
import { createSignedUploadUrl } from '@sde/web/server/createSignedUrl'
import { ServerWebAppConfig } from '@sde/web/webAppConfig'

export type AttachmentUploadApiResponse = { url: string; key: string }

const upload = async (
  req: NextApiRequest,
  res: NextApiResponse<AttachmentUploadApiResponse | { error: string }>,
) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get info from body
    const { name, type, directory } = req.body

    const { url, key } = await createSignedUploadUrl({
      name,
      type,
      directory,
      bucket: ServerWebAppConfig.S3.documentsBucket,
    })

    res.status(200).json({ url, key })
  } catch (error) {
    // TODO SENTRY
    console.error(error)
    res.status(400).json({ error: error as string })
  }
}
export default upload
