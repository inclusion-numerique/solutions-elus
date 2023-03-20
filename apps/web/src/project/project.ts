import { Localization } from "@prisma/client";

export const getProjectPath = ({ slug }: { slug: string }) =>
  `/projets/${slug}`

  export const getProjectFilePath = (filename: string) =>
  `/images/grist-attachments/${filename}`

  export type PopulationBracket = { min: number; max: number }

  export const populationIsInBracket = (
    population: number,
    { min, max }: PopulationBracket,
  ) => population >= min && population <= max
  
  export const getCityWithDepartment = (localization :  {label: string, department: string | null}) => `${localization.label}${
    localization.department
      ? ` (${localization.department})`
      : ''
  }`