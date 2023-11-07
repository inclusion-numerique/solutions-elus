export type ContentType = {
  name: string
  slug: string
  range?: number[]
}

export type FilterType = {
  name: "Région" | "Thématique" | "Population"
  slug: "region" | "thematique" | "population"
  content: ContentType[]
}

export const populations: ContentType[] = [
  { name: "Moins de 500 habitants", slug: "moins-de-500-habitants", range: [0, 500] },
  { name: "De 500 à 1500 habitants", slug: "de-500-a-1500-habitants", range: [500, 1500] },
  { name: "De 1500 à 5000 habitants", slug: "de-1500-a-5000-habitants", range: [1500, 5000] },
  { name: "De 5000 à 15 000 habitants", slug: "de-5000-a-15-000-habitants", range: [5000, 15_000] },
  { name: "Plus de 15 000 habitants", slug: "plus-de-15-000-habitants", range: [15_000, Number.POSITIVE_INFINITY] }
]

export const thematiques: ContentType[] = [
  { name: "Accès au numérique", slug: "acces-au-numerique" },
  { name: "Accès aux soins", slug: "acces-aux-soins" },
  { name: "Attractivité et revitalisation", slug: "attractivite-et-revitalisation" },
  { name: "Démocratie", slug: "democratie" },
  { name: "Développement économique", slug: "developpement-economique" },
  { name: "Economie, Industrie et Commerce", slug: "economie-industrie-et-commerce" },
  { name: "Éducation et jeunesse", slug: "education-et-jeunesse" },
  { name: "Infrastructures locales", slug: "infrastructures-locales" },
  { name: "Logement et cadre de vie", slug: "logement-et-cadre-de-vie" },
  { name: "Participation citoyenne", slug: "participation-citoyenne" },
  { name: "Services au public", slug: "services-au-public" },
  { name: "Solidarités", slug: "solidarites" },
  { name: "Soutien aux associations", slug: "soutien-aux-associations" },
  { name: "Tranquilité publique", slug: "tranquilite-publique" },
  { name: "Transition écologique", slug: "transition-ecologique" },
  { name: "Transport et mobilités", slug: "transport-et-mobilites" }
]

export const regions: ContentType[] = [
  { name: "Auvergne-Rhône-Alpes", slug: "auvergne-rhone-alpes" },
  { name: "Bourgogne-Franche-Comté", slug: "bourgogne-franche-comte" },
  { name: "Bretagne", slug: "bretagne" },
  { name: "Centre-Val de Loire", slug: "centre-val-de-loire" },
  { name: "Corse", slug: "corse" },
  { name: "Grand Est", slug: "grand-est" },
  { name: "Hauts-de-France", slug: "hauts-de-france" },
  { name: "Île-de-France", slug: "ile-de-france" },
  { name: "Normandie", slug: "normandie" },
  { name: "Nouvelle-Aquitaine", slug: "nouvelle-aquitaine" },
  { name: "Occitanie", slug: "occitanie" },
  { name: "Pays de la Loire", slug: "pays-de-la-loire" },
  { name: "Provence-Alpes-Côte d'Azur", slug: "provence-alpes-cote-d-azur" },
  { name: "Guadeloupe", slug: "guadeloupe" },
  { name: "Martinique", slug: "martinique" },
  { name: "Guyane Française", slug: "guyane-francaise" },
  { name: "La Réunion", slug: "la-reunion" },
  { name: "Mayotte", slug: "mayotte" },
]

export const filters: FilterType[] = [
  { name: "Région", slug: "region", content: regions },
  { name: "Thématique", slug: "thematique", content: thematiques },
  { name: "Population", slug: "population", content: populations },
]