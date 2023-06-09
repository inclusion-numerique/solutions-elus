import { PopulationBracketConditions } from '@sde/web/project/project'

export const categoryProjectsLink = (category: string) =>
  `/projets?thematiques=${category}`

export const populationBracketsConditions = {
  'Moins de 500 habitants': { min: 0, max: 500 },
  'De 500 à 1500 habitants': { min: 500, max: 1500 },
  'De 1500 à 5000 habitants': { min: 1500, max: 5000 },
  'De 5000 à 15 000 habitants': { min: 5000, max: 15_000 },
  'Plus de 15 000 habitants': { min: 15_000, max: null },
} as const satisfies Record<string, PopulationBracketConditions>

export type PopulationBracket = keyof typeof populationBracketsConditions

export const populationBrackets = Object.keys(
  populationBracketsConditions,
) as PopulationBracket[]

export const districts = [
  'Auvergne-Rhône-Alpes',
  'Bourgogne-Franche-Comté',
  'Bretagne',
  'Centre-Val de Loire',
  'Corse',
  'Grand Est',
  'Guadeloupe',
  'Guyane Française',
  'Hauts-de-France',
  'Île-de-France',
  'Martinique',
  'Mayotte',
  'Normandie',
  'Nouvelle-Aquitaine',
  'Occitanie',
  'Pays de la Loire',
  "Provence-Alpes-Côte d'Azur",
  'La Réunion',
] as const

export type District = (typeof districts)[number]
