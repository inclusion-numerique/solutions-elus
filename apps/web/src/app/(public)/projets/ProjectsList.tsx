'use client'
import styles from '@sde/web/app/(public)/projets/styles.module.css'
import { ProjectCards } from '@sde/web/app/(public)/projets/ProjectCards'
import { Spinner } from '@sde/web/ui/Spinner'
import { useInView } from 'react-intersection-observer'
import { ProjectListCta } from '@sde/web/app/(public)/projets/ProjectListCta'
import { ProjectListItem } from '@sde/web/legacyProject/projectsList'
import { useRef, useState } from 'react'

const pageSize = 20

export const ProjectsList = ({ projects }: { projects: ProjectListItem[] }) => {
  const previousProjects = useRef(projects)

  const [displayedProjects, setDisplayedProjects] = useState(
    projects.slice(0, pageSize),
  )

  if (previousProjects.current !== projects) {
    // Re-rendered, reset lists and pages
    setDisplayedProjects(projects.slice(0, pageSize))
    previousProjects.current = projects
  }

  const hasNextPage = displayedProjects.length < projects.length

  const { ref: nextPageOnViewRef } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage) {
        setDisplayedProjects([
          ...displayedProjects,
          ...projects.slice(
            displayedProjects.length,
            displayedProjects.length + pageSize,
          ),
        ])
      }
    },
  })

  const totalCount = projects.length

  if (totalCount === 0) {
    return (
      <>
        <div className="fr-mt-4v">
          <p className="fr-text--lead fr-text--bold">
            Il n&apos;y a pas encore de projets pour votre recherche.
          </p>
        </div>
        <ul className="fr-raw-list">
          <ProjectListCta />
        </ul>
      </>
    )
  }

  return (
    <>
      <div className="fr-mt-4v">
        <p className="fr-text--bold">
          {totalCount === 1
            ? `1 projet correspond à votre recherche`
            : `${totalCount} projets correspondent à votre recherche`}
        </p>
      </div>
      <ul className="fr-raw-list fr-mt-2v">
        <ProjectCards projects={displayedProjects} displayCta={!hasNextPage} />
      </ul>
      {hasNextPage ? (
        <div
          className="fr-mt-4v"
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Spinner />
          <div
            ref={nextPageOnViewRef}
            style={{
              width: '0',
              height: '800px',
              position: 'absolute',
              top: '-800px',
              left: 0,
            }}
          />
        </div>
      ) : null}
    </>
  )
}
