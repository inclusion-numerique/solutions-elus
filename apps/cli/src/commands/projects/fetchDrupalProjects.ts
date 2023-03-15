import 'tsconfig-paths/register'
import { Command } from '@commander-js/extra-typings'
import { output } from '@sde/cli/output'
import axios from 'axios'

// TODO Get types from Thibault's work
type DrupalProject = {
  'type': 'node--project',
}

type DrupalProjectsApiResponse = {
  data: DrupalProject[],
  links: { next?: { href?: string } }
}

export const fetchDrupalProjects = new Command()
  .command('projects:fetch-drupal')
  .action(async () => {

    const drupalProjects: DrupalProject[] = []

    let nextPageUrl: string | undefined = 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project'

    // FIXME ts compilation for axios request typing fails :/
    while (nextPageUrl) {

      // eslint-disable-next-line no-await-in-loop
      const response = await axios<DrupalProjectsApiResponse>(nextPageUrl, { headers: { 'Accept': 'application/vnd.api+json' } })

      if (!response.data) {
        throw new Error(`Could not fetch projects list at ${nextPageUrl}`)
      }

      const { data: projects, links } = response.data


      // TODO Foreach project, fetch aditional related data ?
      drupalProjects.push(...projects)
      nextPageUrl = links.next?.href

    }

    // TODO Write all this to a json for usage in another cli to import/merge to Grist

    output(`${drupalProjects.length} projects found`)
  })
