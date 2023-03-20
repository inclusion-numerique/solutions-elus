'use client'

import { useDistrictFilters } from '@sde/web/legacyProject/projectFiltersStore'
import { districts } from '@sde/web/anctProjects'
import { SelectTagsFormField } from '@sde/web/app/(public)/projets/SelectWithTagsFilter'

export const ProjectRegionFilter = () => {
  const selectedDistricts = useDistrictFilters(({ selected }) => selected)
  const toggleDistrict = useDistrictFilters(({ toggle }) => toggle)

  return (
    <div className="fr-hidden-md fr-px-2w fr-px-md-4w">
      <SelectTagsFormField
        id="population-brackets"
        value={selectedDistricts}
        label="Par régions"
        options={districts}
        onAdd={toggleDistrict}
        onRemove={toggleDistrict}
      />
    </div>
  )
}
