import 'tsconfig-paths/register'
import { Command } from '@commander-js/extra-typings'
import { output } from '@sde/cli/output'
import { fetchDrupalProjects } from '@sde/cli/drupal/fetchDrupalProjects'

export const downloadDrupalProjects = new Command()
  .command('projects:drupal:download')
  .action(async () => {

    const drupalProjects = await fetchDrupalProjects()

    // TODO Write all this to a json for usage in another cli to import/merge to Grist

    output(`${drupalProjects.length} projects found`)
  })
