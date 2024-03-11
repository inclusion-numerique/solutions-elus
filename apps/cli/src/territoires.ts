import axios from 'axios'

const authToken = process.env.API_TERRITOIRES_AUTH_TOKEN ?? ''

// Get new JWT during build for the next 24 hours
// https://aides-territoires.beta.gouv.fr/api
export const getTerritoiresJWT = async () => {
  const response = await axios.get<{ token: string }>(
    'https://aides-territoires.beta.gouv.fr/api/connexion', {
      headers: { 'X-Auth-Token': authToken },
  })

  return response.data.token
}