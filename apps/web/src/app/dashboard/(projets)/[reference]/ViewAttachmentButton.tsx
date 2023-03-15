'use client'

import axios from 'axios'
import { saveAs } from 'file-saver'
import { AttachmentGetApiResponse } from '@sde/web/pages/api/file/get'

export const ViewAttachmentButton = ({
  download = false,
  // This prop is renamed for avoiding collision with "key" react prop
  fileKey: key,
  name,
  reference,
}: {
  download?: boolean
  fileKey: string
  name: string
  reference: string
}) => {
  const onClick = async () => {
    const urlResult = await axios.post<AttachmentGetApiResponse>(
      '/api/file/get',
      {
        key,
      },
    )

    if (download) {
      const fileName = `Solutions d'élus - ${reference} - ${name}`
      saveAs(urlResult.data.url, fileName)
      return
    }
    window.open(urlResult.data.url, '_blank')?.focus()
  }

  if (download) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-download-line fr-btn--sm"
      >
        Télécharger
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-eye-fill fr-btn--sm"
    >
      Voir
    </button>
  )
}
