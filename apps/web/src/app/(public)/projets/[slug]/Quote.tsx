import { getProjectFilePath } from '@sde/web/project/getProjectFilePath'
import Image from 'next/image'
import React from 'react'
import styles from './Quote.module.css'

const Quote = ({
  image,
  name,
  text,
}: {
  image: string | null
  name: string | null
  text: string | null
}) => {
  if (!image || !name || !text) {
    return null
  }
  return (
    <>
      <div className={styles.container}>
        <Image
          width={184}
          height={184}
          className={styles.bigImage}
          src={getProjectFilePath(image)}
          alt={`Profil de ${name}`}
        />
        <div className={styles.verticalSeparator} />
        <div>
          <div
            className={`fr-icon-quote-line ${styles.quoteIcon}`}
            aria-hidden="true"
          />
          <div className="fr-text--xl fr-text--bold">{text}</div>
          <div className={styles.nameContainer}>
            <Image
              width={68}
              height={68}
              className={styles.smallImage}
              src={getProjectFilePath(image)}
              alt={`Profil de ${name}`}
            />
            <span className={`fr-text--md fr-text--bold ${styles.name}`}>
              {name}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.horizontalSeparator} />
    </>
  )
}

export default Quote
