'use client'

import { animated, config, useTrail } from '@react-spring/web'
import { LegacyProjectCard } from '@sde/web/app/(public)/projets/LegacyProjectCard'
import { ProjectListCta } from '@sde/web/app/(public)/projets/ProjectListCta'
import { ProjectListItem } from '@sde/web/legacyProject/projectsList'

const AnimatedLegacyProjectCard = animated(LegacyProjectCard)
const AnimatedProjectListCta = animated(ProjectListCta)

const animationTo = { opacity: 1, translateY: 0, scale: 1 }
const animationFrom =
  // Trouble with next env dev and spring not fireing on render
  process.env.NODE_ENV === 'development'
    ? animationTo
    : { opacity: 0, translateY: -32, scale: 0.8 }

export const ProjectCardsWithAnimation = ({
  projects,
  displayCta,
}: {
  projects: ProjectListItem[]
  displayCta?: boolean
}) => {
  const elementsCount = displayCta ? projects.length + 1 : projects.length

  const [trails] = useTrail(
    elementsCount,
    () => ({
      from: animationFrom,
      to: animationTo,
      config: config.default,
      reset: true,
    }),
    [projects],
  )

  return (
    <>
      {trails.map((props, i) =>
        displayCta && i === elementsCount - 1 ? (
          <AnimatedProjectListCta key="list_cta" style={props} />
        ) : (
          <AnimatedLegacyProjectCard
            key={projects[i].id}
            style={props}
            project={projects[i]}
          />
        ),
      )}
    </>
  )
}

export const ProjectCards = ({
  projects,
  displayCta,
}: {
  projects: ProjectListItem[]
  displayCta?: boolean
}) => {
  return (
    <>
      {projects.map((project, i) => (
        <LegacyProjectCard key={project.id} project={project} />
      ))}
      {displayCta ? <ProjectListCta key="cta" /> : null}
    </>
  )
}
