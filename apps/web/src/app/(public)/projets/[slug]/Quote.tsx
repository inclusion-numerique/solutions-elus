import { getProjectFilePath } from '@sde/web/project/project'
import Image from 'next/image'
import React from 'react'
import { textToParagraphs } from '@sde/web/utils/textParser'
import styles from './Quote.module.css'

const Quote = ({
  image,
  name,
  text,
  className,
}: {
  image: string | null
  name: string | null
  text: string | null
  className?: string
}) => {
  if (!name || !text) {
    return null
  }
  return (
    <>
      <div className={`${className ?? ''}`}>
        <span
          className={`fr-icon-quote-line fr-icon--lg ${styles.quoteIcon}`}
          aria-hidden="true"
        />
        <p className="fr-mt-4v fr-text--lg fr-text--bold">
          &laquo;&nbsp;
          {textToParagraphs(text).map((paragraph, index) => (
            <>
              {/* eslint-disable-next-line react/no-array-index-key */}
              {index === 0 ? null : <br key={`br_${index}`} />}
              {/* eslint-disable-next-line react/no-array-index-key */}
              <span key={index} className="fr-text--lg">
                {paragraph}
              </span>
            </>
          ))}
          &nbsp;&raquo;
        </p>
        <div className={styles.nameContainer}>
          {image ? (
            <Image
              width={68}
              height={68}
              className={styles.smallImage}
              src={getProjectFilePath(image)}
              alt={`Profil de ${name}`}
            />
          ) : null}
          <p className={`fr-text--md fr-mb-0 fr-text--bold ${styles.name}`}>
            {name}
          </p>
        </div>
      </div>
      <hr className={`fr-mt-8v fr-mb-0 ${styles.horizontalSeparator}`} />
    </>
  )
}

export default Quote
