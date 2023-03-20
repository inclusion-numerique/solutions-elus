'use client'

import { ProjectListCta } from '@sde/web/app/(public)/projets/ProjectListCta'
import { ProjectListItem } from '@sde/web/legacyProject/projectsList'
import { ProjectCard } from '@sde/web/app/(public)/projets/ProjectCard'
import { useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Spinner } from '@sde/web/ui/Spinner'

const pageSize = 15

/**
 * Frontend paginated infinite scroll project cards list
 */
export const ProjectCards = ({ projects }: { projects: ProjectListItem[] }) => {
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

  return (
    <>
      {displayedProjects.map((project, i) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      <ProjectListCta key="cta" />
      {hasNextPage ? (
        <div
          className="fr-mt-4v"
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
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
              pointerEvents: 'none',
              left: 0,
            }}
          />
        </div>
      ) : null}
    </>
  )
}
