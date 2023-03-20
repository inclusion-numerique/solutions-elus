'use client'

import { populationBrackets } from '@sde/web/anctProjects'
import { ProjectFilterResetButton } from '@sde/web/app/(public)/projets/ProjectFilterResetButton'
import { usePopulationBracketFilters } from '@sde/web/legacyProject/projectFiltersStore'
import { SelectTagsFormField } from '@sde/web/app/(public)/projets/SelectWithTagsFilter'

export const ProjectPopulationFilter = () => {
  const selectedBrackets = usePopulationBracketFilters(
    ({ selected }) => selected,
  )
  const toggleBracket = usePopulationBracketFilters(({ toggle }) => toggle)
  const reset = usePopulationBracketFilters(({ reset }) => reset)
  const isEmpty = usePopulationBracketFilters(
    ({ selected }) => selected.size === 0,
  )

  return (
    <>
      <div className="fr-hidden-md fr-px-2w fr-px-md-4w">
        <SelectTagsFormField
          id="population-brackets"
          value={selectedBrackets}
          label="Par population"
          onAdd={toggleBracket}
          onRemove={toggleBracket}
          options={populationBrackets}
        />
      </div>
      <div className="fr-hidden fr-unhidden-md fr-px-2w fr-px-md-4w">
        <p className="fr-text--regular fr-text--bold fr-text--lg fr-mb-2v">
          Rechercher par population sur le territoire
        </p>
        {populationBrackets.map((bracket) => {
          const isSelected = selectedBrackets.has(bracket)
          return (
            <button
              type="button"
              key={bracket}
              className={`fr-tag fr-mt-2v fr-mr-2v `}
              onClick={() => toggleBracket(bracket)}
              aria-pressed={isSelected ? 'true' : 'false'}
              aria-label={`Retirer ${bracket}`}
            >
              {bracket}
            </button>
          )
        })}
        <ProjectFilterResetButton
          label="Voir toutes les catégories de population"
          onClick={reset}
          hidden={isEmpty}
        />
      </div>
    </>
  )
}
