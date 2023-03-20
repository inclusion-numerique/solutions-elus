'use client'

import { categories } from '@sde/web/anctProjects'
import { ProjectFilterResetButton } from '@sde/web/app/(public)/projets/ProjectFilterResetButton'
import { useCategoriesFilters } from '@sde/web/legacyProject/projectFiltersStore'
import { SelectTagsFormField } from '@sde/web/app/(public)/projets/SelectWithTagsFilter'

export const ProjectCategoryFilter = () => {
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
          options={categories}
        />
      </div>
      <div className="fr-hidden fr-unhidden-md fr-px-2w fr-px-md-4w fr-mt-8v">
        <p className="fr-text--regular fr-text--bold fr-text--lg fr-mb-2v">
          Rechercher par thématiques
        </p>
        {categories.map((category) => {
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
          label="Voir toutes les thématiques"
          onClick={reset}
          hidden={isEmpty}
        />
      </div>
    </>
  )
}
