import fs from "node:fs"
import { resolve } from 'node:path'
import { Command } from '@commander-js/extra-typings'
import { output } from '@sde/cli/output'
import { fetchDrupalProjects } from '@sde/cli/drupal/fetchDrupalProjects'

const outputDir = 'var'
const outputFile = resolve(outputDir, 'drupal-projects.json')

export const downloadDrupalProjects = new Command()
  .command('projects:drupal:download')
  .action(async () => {

    const drupalProjects = await fetchDrupalProjects()
    if (!fs.existsSync(outputDir)) {
      output(`Creating ${outputDir} directory`)
      fs.mkdirSync(outputDir)
    }

    fs.writeFileSync(outputFile, JSON.stringify(drupalProjects))

    output(`${drupalProjects.length} projects exported to ${outputFile}`)
  })
