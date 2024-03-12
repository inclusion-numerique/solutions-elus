import axios from 'axios'

export type SirenCommunitySearchResponse = {
  count: number
  next: null
  previous: null
  results: Etablissement[]
}

export type Etablissement = {
  id: string
  text: string
  name: string
  scale: string
  zipcodes: string[]
}

export const searchCommunity = async (searchQuery: string) => {
  const result = await axios.get<SirenCommunitySearchResponse>("https://aides-territoires.beta.gouv.fr/api/perimeters", {
    params: {
      q: searchQuery.trim(),
      page: 1,
      itemsPerPage: 50,
      is_visible_to_users: true,
      is_non_obsolete: true,
    },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TERRITOIRES_JWT}`,
    },
  })

  if (result.status !== 200) {
    // TODO Sentry
    throw new Error(
      `Impossible de se connecter au registre SIRENE. Merci de réessayer ultérieurement.`,
    )
  }

  return result.data
}
