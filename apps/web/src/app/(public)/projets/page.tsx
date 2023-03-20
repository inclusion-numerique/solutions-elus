import styles from '@sde/web/app/(public)/PublicLayout.module.css'
import { ProjectsListContainer } from '@sde/web/app/(public)/projets/ProjectsListContainer'
import { getProjectsList } from '@sde/web/legacyProject/projectsList'
import { Category } from '@sde/web/anctProjects'
import { District } from '@sde/web/projethoteque/legacyProjects'
import { parseArraySearchParam } from '@sde/web/utils/parseArraySearchParam'

// Need to SSR since search params are dynamic
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
          <ProjectsListContainer
            initialDistrictsFilter={parseArraySearchParam(
              searchParams?.regions,
            )}
            initialCategoriesFilter={parseArraySearchParam(
              searchParams?.thematiques,
            )}
            projects={projects}
          />
        </div>
      </div>
    </>
  )
}

export default ProjectsPage
