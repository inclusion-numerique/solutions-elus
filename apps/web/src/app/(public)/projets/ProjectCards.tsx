import { ProjectListCta } from '@sde/web/app/(public)/projets/ProjectListCta'
import { ProjectListItem } from '@sde/web/legacyProject/projectsList'
import { ProjectCard } from '@sde/web/app/(public)/projets/ProjectCard'

export const ProjectCards = ({
  projects,
  displayCta,
}: {
  projects: ProjectListItem[]
  displayCta?: boolean
}) => (
  <>
    {projects.map((project, i) => (
      <ProjectCard key={project.id} project={project} />
    ))}
    {displayCta ? <ProjectListCta key="cta" /> : null}
  </>
)
