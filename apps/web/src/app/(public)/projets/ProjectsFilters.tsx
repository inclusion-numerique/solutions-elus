'use client'

import { ProjectMap } from '@sde/web/app/(public)/projets/ProjectsMap'
import { ProjectFilterResetButton } from '@sde/web/app/(public)/projets/ProjectFilterResetButton'
import { useDistrictFilters } from '@sde/web/legacyProject/projectFiltersStore'

export const ProjectsFilters = () => {
  const reset = useDistrictFilters(({ reset }) => reset)
  const isEmpty = useDistrictFilters(({ selected }) => selected.size === 0)

  return (
    <div className="fr-px-2w fr-px-sm-1w fr-px-md-0">
      <div className="fr-form-group fr-py-8v">
        <fieldset className="fr-fieldset">
          <legend
            className="fr-fieldset__legend fr-text--regular fr-text--bold fr-text--lg fr-mx-6v"
            id="checkboxes-legend"
          >
            Régions
          </legend>
          <ProjectMap />
          <span className="fr-ml-6v">
            <ProjectFilterResetButton
              label={'Voir toutes les régions'}
              hidden={isEmpty}
              onClick={reset}
            />
          </span>
        </fieldset>
      </div>
    </div>
  )
}
