'use client'

import { ProjectCards } from '@sde/web/app/(public)/projets/ProjectCards'
import { ProjectListCta } from '@sde/web/app/(public)/projets/ProjectListCta'
import { ProjectListItem } from '@sde/web/legacyProject/projectsList'
import { useMemo } from 'react'
import {
  useCategoriesFilters,
  useDistrictFilters,
  usePopulationBracketFilters,
  useProjectSearch,
} from '@sde/web/legacyProject/projectFiltersStore'
import Fuse from 'fuse.js'
import { filterProjects } from '@sde/web/legacyProject/filterProjectList'
import { District } from '@sde/web/anctProjects'
import { useOnDiff } from '@sde/web/hooks/useOnDiff'

export const ProjectsList = ({
  projects,
  initialDistrictsFilter,
  initialCategoriesFilter,
}: {
  initialDistrictsFilter: District[]
  initialCategoriesFilter: string[]
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
  const searchQuery = useProjectSearch(({ query }) => query)
  const districts = useDistrictFilters(({ selected }) => selected)
  const categories = useCategoriesFilters(({ selected }) => selected)
  const populationBrackets = usePopulationBracketFilters(
    ({ selected }) => selected,
  )

  // Memoize fuze instance to avoid re-indexing on each change
  const fuse = useMemo(
    () =>
      new Fuse<ProjectListItem>(projects, {
        includeScore: true,
        keys: [
          { name: 'title', weight: 2 },
          'program.name',
          'localization.label',
          'localization.departmentName',
          'localization.department',
          'localization.regionName',
          'categories',
        ],
        threshold: 0.4,
      }),
    [projects],
  )

  // Memoize search result to avoid re-searching on other filter changes
  const searchResult = useMemo(() => {
    if (searchQuery.trim() === '') {
      return projects
    }

    const result = fuse
      .search(searchQuery)
      .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
    return result.map(({ item }) => item)
  }, [projects, fuse, searchQuery])

  // Apply simple filters
  const filteredProjects = filterProjects({
    projects: searchResult,
    districts,
    categories,
    populationBrackets,
  })

  const totalCount = filteredProjects.length

  if (totalCount === 0) {
    return (
      <>
        <p className="fr-text--lead fr-text--bold">
          Il n&apos;y a pas encore de projets pour votre recherche.
        </p>
        <ul className="fr-raw-list">
          <ProjectListCta />
        </ul>
      </>
    )
  }

  return (
    <>
      <p className="fr-text--bold fr-text--lg">
        {totalCount === 1
          ? `1 projet correspond à votre recherche`
          : `${totalCount} projets correspondent à votre recherche`}
      </p>
      <ul className="fr-raw-list fr-mt-2v">
        <ProjectCards projects={filteredProjects} />
      </ul>
    </>
  )
}
