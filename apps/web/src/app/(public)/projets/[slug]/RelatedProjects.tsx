'use client'

import { CSSProperties, forwardRef } from 'react'
import styles from '@sde/web/app/(public)/Showcase.module.css'
import { useShowcase } from '@sde/web/app/(public)/useShowcase'
import Link from 'next/link'
import { useSwipeable } from 'react-swipeable'
import { ShowcaseProject } from '@sde/web/legacyProject/showcaseProjects'
import {
  getProjectLocalizationLabelWithDepartments,
  getProjectFilePath,
  getProjectPath,
} from '@sde/web/project/project'

export const RelatedProjects = ({ projects }: { projects: ShowcaseProject[] }) => {
  const { containerRef, firstCardRef, offsetString, next, previous } =
    useShowcase({ count: projects.length })

  // https://formidable.com/open-source/react-swipeable/
  const { ref: swipeRef } = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: previous,
    // preventScrollOnSwipe: true,
    delta: 10,
    trackTouch: true,
    // swipeDuration: 1000,
    // touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
  })

  return (
    <div ref={swipeRef} className="fr-mt-12w">
      <div ref={containerRef} className="fr-container">
        <h2 className="fr-mb-0">
          Autres projets
          <br />
          et réalisations similaires.
        </h2>
        <div className={`fr-mt-4v ${styles.header}`}>
          <Link
            href="/projets"
            className="fr-link fr-link--icon-right fr-icon-arrow-right-line"
          >
            Voir tous les projets
          </Link>
          <div className="fr-btns-group fr-btns-group--inline fr-mt-8v fr-mt-md-0">
            <button
              type="button"
              className="fr-btn fr-btn--secondary fr-mb-0 fr-mr-0 fr-icon-arrow-left-line"
              aria-label="Voir le projet précédent"
              onClick={previous}
            />
            <button
              type="button"
              className="fr-btn fr-btn--secondary fr-mb-0 fr-ml-2w fr-icon-arrow-right-line"
              aria-label="Voir le projet suivant"
              onClick={next}
            />
          </div>
        </div>
      </div>
      <div className={`fr-pt-8v fr-pb-8v ${styles.showcaseContainer}`}>
        <div
          className={styles.cardsWrapper}
          style={{
            transform: `translateX(${offsetString})`,
          }}
        >
          {projects.map((project, index) => (
            <ShowcaseCard
              project={project}
              key={project.id}
              ref={index === 0 ? firstCardRef : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const ShowcaseCard = forwardRef<
  HTMLAnchorElement,
  { project: ShowcaseProject; style?: CSSProperties | undefined }
>(
  (
    {
      project: { title, slug, localization, coverImage, coverImageAlt },
      style,
    },
    ref,
  ) => (
    <Link
      ref={ref}
      href={getProjectPath({ slug })}
      title={`Voir le projet "${title}"`}
      className={styles.card}
    >
      <picture>
        <img
          src={getProjectFilePath(coverImage)}
          alt={coverImageAlt ?? `Photographie illustrant le projet "${title}"`}
        />
      </picture>
      <div className={`fr-px-5w fr-py-10v ${styles.cardContent}`}>
        <p
          className="fr-hint-text"
          style={{ color: 'var(--text-mention-grey' }}
        >
          <span className="fr-mr-1w fr-icon--sm fr-icon-map-pin-2-line" />
          {getProjectLocalizationLabelWithDepartments(localization)}
        </p>
        <h6 style={{ flexGrow: 1 }}>{title}</h6>
        <p className="fr-link fr-link--icon-right fr-icon-arrow-right-line fr-mt-4v">
          Voir le projet
        </p>
      </div>
    </Link>
  ),
)
ShowcaseCard.displayName = 'ShowcaseCard'
