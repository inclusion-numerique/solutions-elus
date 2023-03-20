import styles from '@sde/web/app/(public)/PublicLayout.module.css'
import { getProjectsList } from '@sde/web/legacyProject/projectsList'
import { Category, District } from '@sde/web/anctProjects'
import { parseArraySearchParam } from '@sde/web/utils/parseArraySearchParam'
import { ProjectsListAside } from '@sde/web/app/(public)/projets/ProjectsListAside'
import { ProjectSearchBar } from '@sde/web/app/(public)/projets/ProjectSearchBar'
import { ProjectPopulationFilter } from '@sde/web/app/(public)/projets/ProjectPopulationFilter'
import { ProjectRegionFilter } from '@sde/web/app/(public)/projets/ProjectRegionFilter'
import { ProjectCategoryFilter } from '@sde/web/app/(public)/projets/ProjectCategoryFilter'
import { ProjectsList } from '@sde/web/app/(public)/projets/ProjectsList'

// Need to SSR since search params are dynamic. This avoids flickering on page load
export const revalidate = 0

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams?: {
    thematiques?: Category | Category[]
    regions?: District | District[]
  }
}) => {
  // Filtering and pagination is done in the frontend
  // We have only a small dataset of projects so this is way more performant
  const projects = await getProjectsList()

  return (
    <>
      <div className={`${styles.withImageBackground} fr-pb-20v`}>
        <div
          className="fr-container fr-py-20v"
          style={{ position: 'relative' }}
        >
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
              <h1
                className={`fr-display--xs  fr-mb-0 ${styles.titleOnBackground}`}
              >
                Retrouvez ici les projets et réalisations des collectivités
              </h1>
            </div>
          </div>
        </div>
        <div
          className="fr-container fr-background-default--grey fr-p-0"
          style={{
            position: 'relative',
            boxShadow: '0 0 0 1px var(--border-default-grey)',
          }}
        >
          <div className="fr-grid-row fr-p-0">
            <div className="fr-col-12 fr-col-md-4 fr-p-0 fr-background-alt--grey">
              <aside
                className="fr-sidemenu fr-sidemenu--sticky fr-p-0"
                style={{
                  boxShadow: 'inset -1px 0 0 0 var(--border-default-grey)',
                }}
                aria-label="Menu latéral"
              >
                <ProjectsListAside />
              </aside>
            </div>
            <div className="fr-col-12 fr-col-md-8">
              <ProjectSearchBar />
              <ProjectPopulationFilter />
              <ProjectRegionFilter />
              <ProjectCategoryFilter />
              <div className="fr-px-2w fr-px-md-4w fr-pb-8v fr-mt-8v">
                <hr />
                <ProjectsList
                  projects={projects}
                  initialDistrictsFilter={parseArraySearchParam(
                    searchParams?.regions,
                  )}
                  initialCategoriesFilter={parseArraySearchParam(
                    searchParams?.thematiques,
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectsPage
