import fs from 'node:fs'
import { resolve } from 'node:path'
import { Command } from '@commander-js/extra-typings'
import { output } from '@sde/cli/output'
import { convertDrupalProjectsToGristProjects } from '@sde/cli/drupal/convertDrupalProjectsToGristProjects'
import { DrupalProject } from '@sde/cli/drupal/fetchDrupalProjects'
import { drupalOutputFile } from './downloadDrupalProjects'

export const gristOutputFile = resolve('var', 'grist-project-fields.json')

export const convertDrupalProjectsToGristProjectFields = new Command()
  .command('projects:drupal:convert')
  .action(() => {
    if (!fs.existsSync(drupalOutputFile)) {
      output(`${drupalOutputFile} does not exists`)
      return
    }
    const drupalProjects = JSON.parse(
      fs.readFileSync(drupalOutputFile, 'utf8'),
    ) as DrupalProject[]

    const gristProjectFields =
      convertDrupalProjectsToGristProjects(drupalProjects)
    fs.writeFileSync(gristOutputFile, JSON.stringify(gristProjectFields))

    output(
      `${gristProjectFields.length} projects converted to ${gristOutputFile}`,
    )
  })
