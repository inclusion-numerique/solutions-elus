'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import styles from './SocialNetworks.module.css'

const icons = [
  {
    alt: 'Partager sur Facebook',
    src: 'fr-icon-facebook-circle-line',
    shareLink: 'https://www.facebook.com/sharer/sharer.php?u=',
  },
  {
    alt: 'Partager sur Twitter',
    src: 'fr-icon-twitter-line',
    shareLink: 'https://twitter.com/intent/tweet?text=',
  },
  {
    alt: 'Partager sur Linkedin',
    src: 'fr-icon-linkedin-box-line',
    shareLink: 'https://www.linkedin.com/shareArticle?mini=true&url=',
  },
]

const SocialNetworks = ({
  url,
  className,
}: {
  url: string
  className?: string
}) => {
  const [copied, setCopied] = useState(false)

  return (
    <div className={className}>
      Partager la page
      <div className={styles.icons}>
        {icons.map((icon) => (
          <Link
            key={icon.src}
            title={icon.alt}
            className={styles.icon}
            href={`${icon.shareLink}${url}`}
            target="_blank"
          >
            <span className={icon.src} aria-hidden="true" />
          </Link>
        ))}
        <button
          className={styles.icon}
          title="Copier le lien du site"
          onClick={() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1000)
            navigator.clipboard.writeText(url)
          }}
        >
          {copied && <span className={styles.copiedHover}>Copié</span>}
          <span className="fr-icon-links-line" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default SocialNetworks
