import fs from 'node:fs'
import { resolve } from 'node:path'
import { Command } from '@commander-js/extra-typings'
import { output } from '@sde/cli/output'
import { fetchDrupalProjects } from '@sde/cli/drupal/fetchDrupalProjects'

export const drupalOutputFile = resolve('var', 'drupal-projects.json')

export const downloadDrupalProjects = new Command()
  .command('projects:drupal:download')
  .action(async () => {
    const drupalProjects = await fetchDrupalProjects()
    if (!fs.existsSync('var')) {
      output(`Creating var directory`)
      fs.mkdirSync('var')
    }

    fs.writeFileSync(drupalOutputFile, JSON.stringify(drupalProjects))

    output(`${drupalProjects.length} projects exported to ${drupalOutputFile}`)
  })
