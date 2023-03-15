'use client'

import { ProjectsFilters } from '@sde/web/app/(public)/projets/ProjectsFilters'
import { ProjectsCategories } from '@sde/web/app/(public)/projets/ProjectsCategories'
import { ProjectsList } from '@sde/web/app/(public)/projets/ProjectsList'
import { Category } from '@sde/web/anctProjects'
import { useOnDiff } from '@sde/web/hooks/useOnDiff'
import { useCategoriesFilters, useDistrictFilters } from '@sde/web/legacyProject/projectFiltersStore'
import { filterProjects } from '@sde/web/legacyProject/filterProjectList'
import { ProjectListItem } from '@sde/web/legacyProject/projectsList'
import { District } from '@sde/web/projethoteque/legacyProjects'

export const ProjectsListContainer = ({
  projects,
  initialDistrictsFilter,
  initialCategoriesFilter,
}: {
  initialDistrictsFilter: District[]
  initialCategoriesFilter: Category[]
  projects: ProjectListItem[]
}) => {
  const filtersString = [
    ...initialDistrictsFilter,
    ...initialCategoriesFilter,
  ].join(',')

  const initDistricts = useDistrictFilters(({ initialize }) => initialize)
  const initCategories = useCategoriesFilters(({ initialize }) => initialize)

  useOnDiff(filtersString, () => {
    initDistricts(initialDistrictsFilter)
    initCategories(initialCategoriesFilter)
  })

  const districts = useDistrictFilters(({ selected }) => selected)
  const categories = useCategoriesFilters(({ selected }) => selected)

  const filteredProjects = filterProjects({ projects, districts, categories })

  return (
    <div className="fr-grid-row fr-p-0">
      <div className="fr-col-12 fr-col-md-4 fr-p-0 fr-background-alt--grey">
        <aside
          className="fr-sidemenu fr-sidemenu--sticky fr-p-0"
          style={{
            boxShadow: 'inset -1px 0 0 0 var(--border-default-grey)',
          }}
          aria-label="Menu latéral"
        >
          <ProjectsFilters />
        </aside>
      </div>
      <div className="fr-col-12 fr-col-md-8">
        <ProjectsCategories />
        <div className="fr-px-2w fr-px-md-4w fr-pb-8v">
          <ProjectsList projects={filteredProjects} />
        </div>
      </div>
    </div>
  )
}
