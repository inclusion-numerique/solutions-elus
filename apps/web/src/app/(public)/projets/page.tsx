import styles from '@sde/web/app/(public)/PublicLayout.module.css'
import { getProjectsList } from '@sde/web/legacyProject/projectsList'
import { District } from '@sde/web/anctProjects'
import { parseArraySearchParam } from '@sde/web/utils/parseArraySearchParam'
import { ProjectsListAside } from '@sde/web/app/(public)/projets/ProjectsListAside'
import { ProjectSearchBar } from '@sde/web/app/(public)/projets/ProjectSearchBar'
import { ProjectPopulationFilter } from '@sde/web/app/(public)/projets/ProjectPopulationFilter'
import { ProjectRegionFilter } from '@sde/web/app/(public)/projets/ProjectRegionFilter'
import ProjectCategoryFilter from '@sde/web/app/(public)/projets/ProjectCategoryFilter'
import { ProjectsList } from '@sde/web/app/(public)/projets/ProjectsList'
import { getProjectCategories } from '@sde/web/legacyProject/categories'
import { ShareSearchCTA } from '../ShareSearchCTA'
import { Paragraph } from '../Paragraph'
import { Form } from '../[filter]/[slug]/Form'
import { Projects } from '../[filter]/[slug]/Projects'

// Need to SSR since search params are dynamic. This avoids flickering on page load
export const revalidate = 0

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams?: {
    thematiques?: string | string[]
    regions?: District | District[]
  }
}) => {
  // Filtering and pagination is done in the frontend
  // We have only a small dataset of projects so this is way more performant
  const projects = await getProjectsList()

  return (
    <>
      <div className={`${styles.withImageBackground}`}>
        <div
          className="fr-container fr-py-25v"
          style={{ position: 'relative' }}
        >
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
              <h1
                className={`fr-display--xs fr-mb-0 ${styles.titleOnBackground}`}
              >
                Retrouvez ici les projets et réalisations des collectivités
              </h1>
            </div>
          </div>
        </div>
        <Form />
      </div>
      <Projects projects={projects} />
      <ShareSearchCTA />
      <div className="fr-container">
        <Paragraph />
      </div>
    </>
  )
}

export default ProjectsPage
