'use client'

import { ProjectFilterResetButton } from '@sde/web/app/(public)/projets/ProjectFilterResetButton'
import { useCategoriesFilters } from '@sde/web/legacyProject/projectFiltersStore'
import { SelectTagsFormField } from '@sde/web/app/(public)/projets/SelectWithTagsFilter'

const ProjectCategoryFilter = ({
  projectCategories,
}: {
  projectCategories: string[]
}) => {
  const selectedCategories = useCategoriesFilters(({ selected }) => selected)
  const toggleCategory = useCategoriesFilters(({ toggle }) => toggle)
  const reset = useCategoriesFilters(({ reset }) => reset)
  const isEmpty = useCategoriesFilters(({ selected }) => selected.size === 0)

  return (
    <>
      <div className="fr-hidden-md fr-px-2w fr-px-md-4w">
        <SelectTagsFormField
          id="population-brackets"
          value={selectedCategories}
          label="Par thématiques"
          onAdd={toggleCategory}
          onRemove={toggleCategory}
          options={projectCategories}
        />
      </div>
      <div className="fr-hidden fr-unhidden-md fr-px-2w fr-px-md-4w fr-mt-8v">
        <p className="fr-text--regular fr-text--bold fr-text--lg fr-mb-2v">
          Rechercher par thématiques
        </p>
        {projectCategories.map((category) => {
          const isSelected = selectedCategories.has(category)
          return (
            <button
              type="button"
              key={category}
              className={`fr-tag fr-mt-2v fr-mr-2v `}
              onClick={() => toggleCategory(category)}
              aria-pressed={isSelected ? 'true' : 'false'}
              aria-label={`Retirer ${category}`}
            >
              {category}
            </button>
          )
        })}
        <ProjectFilterResetButton
          label="Effacer les filtres"
          onClick={reset}
          hidden={isEmpty}
        />
      </div>
    </>
  )
}

export default ProjectCategoryFilter
