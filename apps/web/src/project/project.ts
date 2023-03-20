export const getProjectPath = ({ slug }: { slug: string }) => `/projets/${slug}`

export const getProjectFilePath = (filename: string) =>
  `/images/grist-attachments/${filename}`

export type PopulationBracketConditions = { min: number; max: number | number }

export const populationIsInBracket = (
  population: number,
  { min, max }: PopulationBracketConditions,
) => population >= min && population <= max

export const getCityWithDepartment = (localization: {
  label: string
  department: string | null
}) =>
  `${localization.label}${
    localization.department ? ` (${localization.department})` : ''
  }`
