import { request } from 'undici'
import { output } from '@sde/cli/output'


// TODO Get types from Thibault's work
export type DrupalProject = {
  'type': 'node--project',
}

export type DrupalProjectsApiResponse = {
  data: DrupalProject[],
  links: { next?: { href?: string } }
}

const fetchDrupalProjectsPage = async (url: string) => {
  const {
    statusCode,
    body,
    // eslint-disable-next-line no-await-in-loop
  } = await request(url, { headers: { 'Accept': 'application/vnd.api+json' } })

  if (statusCode !== 200) {
    // eslint-disable-next-line no-await-in-loop
    output(await body.text())
    throw new Error(`Could not fetch projects list at ${url}`)
  }

  const { data: projects, links } = await body.json() as DrupalProjectsApiResponse

  return { projects, next: links.next?.href }
}


export const fetchDrupalProjects = async () => {
  const drupalProjects: DrupalProject[] = []

  let nextPageUrl = 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project'

  // There will be ~3 loops (~120 projects in pages of 50 items)
  // eslint-disable-next-line no-constant-condition
  while (true) {

    // eslint-disable-next-line no-await-in-loop
    const { projects, next } = await fetchDrupalProjectsPage(nextPageUrl)

    // TODO Foreach project, fetch aditional related data ?
    drupalProjects.push(...projects)

    if (!next) {
      break
    }
    nextPageUrl = next
  }

  return drupalProjects
}

