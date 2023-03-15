import { projethotequeUrl } from '@sde/web/projethoteque/projethoteque'
import { Category } from '@sde/web/anctProjects'

export const categoryToLegacyCategory = (category: string): string => category

const legacyCategories = [
  'Accès au numérique',
  'Attractivité et dynamisme territorial',
  'CRTE',
  'Commerces',
  'Développement économique et industriel',
  'Éducation et jeunesse',
  'Inclusion sociale',
  'Industrie',
  'Infrastructures locales',
  'Ingénierie sur mesure',
  'Logement et cadre de vie',
  'PVD',
  'Services au public',
  'Soutien aux associations',
  'Tiers-lieux',
  'Transition écologique',
  'Transport et mobilités',
] as const

export type LegacyCategory = typeof legacyCategories[number]

export const legacyCategoryToCategory = (
  legacyCategory: LegacyCategory,
): Category => {
  if (legacyCategory === 'Attractivité et dynamisme territorial') {
    return 'Attractivité'
  }

  // Contrat de relance et de transition écologique
  // Petites villes de demain
  if (legacyCategory === 'CRTE' || legacyCategory === 'PVD') {
    return 'Transition écologique'
  }
  if (
    legacyCategory === 'Commerces' ||
    legacyCategory === 'Développement économique et industriel' ||
    legacyCategory === 'Industrie'
  ) {
    return 'Développement économique'
  }

  if (legacyCategory == 'Inclusion sociale') {
    return 'Solidarité'
  }
  if (legacyCategory == 'Ingénierie sur mesure') {
    return 'Infrastructures locales'
  }

  if (legacyCategory === 'Tiers-lieux') {
    return 'Solidarité'
  }

  return legacyCategory
}

export const legacyProjectUrl = (slug: string): string =>
  `${projethotequeUrl}/${slug}`

export const legacyProjectImageUrl = (imagePath: string): string =>
  `${projethotequeUrl}${imagePath}`

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

export type District = typeof districts[number]
