import { CSSProperties, ForwardedRef, forwardRef } from 'react'
import { ProjectListItem } from '@sde/web/legacyProject/projectsList'
import {
  getCityWithDepartment,
  getProjectFilePath,
  getProjectPath,
} from '@sde/web/project/project'
import Link from 'next/link'
import styles from './ProjectCard.module.css'

export const ProjectCard = forwardRef(
  (
    {
      style,
      project: {
        program,
        categories,
        id,
        title,
        coverImage,
        coverImageAlt,
        localization,
        slug,
      },
    }: {
      style?: CSSProperties
      project: ProjectListItem
    },
    ref: ForwardedRef<HTMLLIElement>,
  ) => {
    const tags = [program?.name, ...categories].filter(
      (tag): tag is string => !!tag,
    )

    return (
      <li style={style} ref={ref}>
        <Link
          className={`fr-mb-4v ${styles.projectCard}`}
          href={getProjectPath({ slug })}
          title={`Voir le projet "${title}"`}
        >
          <picture className={styles.picture}>
            <img
              id={`${id}__image`}
              src={getProjectFilePath(coverImage)}
              alt={coverImageAlt ?? `Photo illustrant le projet "${title}"`}
            />
          </picture>
          <div className={`${styles.content} fr-p-8v`}>
            <p
              className="fr-hint-text fr-mb-0"
              style={{ color: 'var(--text-mention-grey' }}
            >
              <span className="fr-mr-1w fr-icon--sm fr-icon-map-pin-2-line" />
              {getCityWithDepartment(localization)}
            </p>
            <h6 className={`fr-mt-4v fr-mb-0 fr-text--lg ${styles.title}`}>
              {title}
            </h6>
            <ul
              className="fr-tags-group fr-mt-4v fr-mb-0"
              style={{ flexGrow: 1 }}
            >
              {tags.map((tag) => (
                <li key={tag} style={{ lineHeight: '32px' }}>
                  <p className="fr-tag fr-tag--sm">{tag}</p>
                </li>
              ))}
            </ul>
            <p className="fr-link fr-link--icon-right fr-icon-arrow-right-line fr-mt-4v">
              Voir le projet
            </p>
          </div>
        </Link>
      </li>
    )
  },
)
ProjectCard.displayName = 'ProjectCard'
