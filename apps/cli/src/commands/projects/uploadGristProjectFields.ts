import fs from 'node:fs'
import { Command } from '@commander-js/extra-typings'
import { output } from '@sde/cli/output'
import { createProjectRecords, listProjectRecords } from '@sde/cli/grist/grist'
import { GristProjectFields } from '@sde/cli/grist/grist.type'
import { isDefinedAndNotNull } from '@sde/web/utils/isDefinedAndNotNull'
import { gristOutputFile } from './convertDrupalProjectsToGristProjectFields'

export const uploadGristProjectFields = new Command()
  .command('projects:grist:upload')
  .action(async () => {
    if (!fs.existsSync(gristOutputFile)) {
      output(`${gristOutputFile} does not exists`)
      return
    }

    const existingGristProjects = await listProjectRecords()
    const existingGristProjectsId = new Set(
      [
        ...existingGristProjects.records,
        ...existingGristProjects.invalidRecords.map(({ data }) => data),
      ]
        .map((project) => project.fields.drupal_id)
        .filter(isDefinedAndNotNull),
    )

    const gristProjects = JSON.parse(
      fs.readFileSync(gristOutputFile, 'utf8'),
    ) as GristProjectFields[]
    const gristsProjectsToUpload = gristProjects.filter(
      (project) => !existingGristProjectsId.has(project.drupal_id),
    )

    if (gristsProjectsToUpload.length > 0) {
      await createProjectRecords(gristsProjectsToUpload)
    }

    output(`${gristsProjectsToUpload.length} projects uploaded to grist`)
  })
