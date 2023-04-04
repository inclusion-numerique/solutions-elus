export const getProjectPath = ({ slug }: { slug: string }) => `/projets/${slug}`

export const getProjectFilePath = (filename: string) =>
  `/images/grist-attachments/${filename}`

export type PopulationBracketConditions = { min: number; max: number | null }

export const populationIsInBracket = (
  population: number,
  { min, max }: PopulationBracketConditions,
) => (max ? population >= min && population <= max : population >= min)

export const getProjectLocalizationLabelWithDepartments = ({
  department,
  label,
  echelon,
}: {
  label: string
  department: string | null
  echelon: string
}) =>
  echelon === 'region'
    ? label
    : `${label}${department ? ` (${department})` : ''}`
