import { useEffect, useState } from 'react'
import { Spinner } from '@sde/web/ui/Spinner'
import axios from 'axios'
import { AttachmentUploadApiResponse } from '@sde/web/pages/api/file/upload'
import * as Sentry from '@sentry/nextjs'

export const AttachmentViewer = ({
  key,
  name,
}: {
  key: string
  type: string
  name: string
}) => {
  const [assetUrl, setAssetUrl] = useState<string | null>(null)

  useEffect(() => {
    axios
      .post<AttachmentUploadApiResponse>('/api/upload/get', {
        key,
      })
      .then((response) => response.data.url)
      .then(setAssetUrl)
      .catch((error) => {
        Sentry.captureException(error, {
          extra: { feature: 'AttachmentViewer' },
        })
      })
  }, [key])

  if (!assetUrl) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  // TODO download asset  and button to Open asset in new tab
  return (
    <div>
      <div>
        <div>{name}</div>
      </div>
    </div>
  )
}
