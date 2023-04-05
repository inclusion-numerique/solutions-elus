import { Argument, Command } from '@commander-js/extra-typings'
import { output } from '@sde/cli/output'
import {
  downloadAttachments,
  insertInDataBase,
  listLocalisations,
  listPrograms,
  listProjectRecords,
  listThematiques,
} from '@sde/cli/grist/grist'
import { isDefinedAndNotNull } from '@sde/web/utils/isDefinedAndNotNull'
import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

export const downloadGristProjects = new Command()
  .command('projects:grist:download')
  .addArgument(new Argument('[output]', 'output file'))
  // .addOption(new Option('--from-output'))
  .action(async (outputFileName) => {
    const [gristProjects, programs, thematiques] = await Promise.all([
      listProjectRecords(),
      listPrograms(),
      listThematiques(),
    ])

    if (programs.invalidRecords.length > 0) {
      output('Invalid programs from Grist, stopping import')
      output(programs.invalidRecords)
      process.exit(1)
      return
    }

    if (thematiques.invalidRecords.length > 0) {
      output('Invalid thematiques from Grist, stopping import')
      output(thematiques.invalidRecords)

      process.exit(1)
      return
    }

    if (gristProjects.invalidRecords.length > 0) {
      for (const invalid of gristProjects.invalidRecords) {
        output(`Project id ${invalid.data.id} is invalid:`)
        for (const issue of invalid.error.issues) {
          output(issue)
        }
        output(invalid.data.fields)
        output('__________________________________________')
      }
    }

    const now = Date.now() / 1000

    const projectsToPublish = gristProjects.records.filter(
      (project) =>
        project.fields.A_publier_le && project.fields.A_publier_le <= now,
    )

    // To avoid pagination logic (50 000 records and 500 max items per page)
    // And long running time, only fetch required localizations
    const localisationIds = [
      ...new Set(
        projectsToPublish
          .map(({ fields: { Localisation } }) => Localisation)
          .filter(isDefinedAndNotNull),
      ),
    ]
    const localisations = await listLocalisations({
      filter: { id: localisationIds },
    })
    if (gristProjects.invalidRecords.length > 0) {
      output(
        `⚠️  There was ${gristProjects.invalidRecords.length}/${
          gristProjects.records.length + gristProjects.invalidRecords.length
        } invalid projects in Grist dataset that will NOT be imported`,
      )
    }

    if (gristProjects.records.length - projectsToPublish.length !== 0) {
      output(
        `⚠️  ${
          gristProjects.records.length - projectsToPublish.length
        } projects are waiting to be published and will NOT be imported`,
      )
    }

    output(`Downloaded grist data`)
    output(`- ${projectsToPublish.length} projects`)
    output(`- ${programs.records.length} programs`)
    output(`- ${thematiques.records.length} thematiques`)
    output(
      `- ${localisations.records.length} localisations (only relevant ones)`,
    )

    output(`Downloading attachments...`)
    const attachments = await downloadAttachments(projectsToPublish)
    output(`${attachments.size} Attachments have been downloaded`)

    if (projectsToPublish.length < 100) {
      output(
        `Projects to publish count is unusually low (got ${projectsToPublish.length}). Cancelling import to avoid data loss.`,
      )
      process.exit(1)
    }

    const insertInput = [
      projectsToPublish,
      localisations.records,
      programs.records,
      thematiques.records,
      attachments,
    ] as const

    if (outputFileName) {
      if (!existsSync('var')) {
        await mkdir('var')
      }
      await writeFile(
        resolve('var', outputFileName),
        JSON.stringify(insertInput),
      )
    }
    output('Debugging attachments')
    for (const attachment of attachments.values()) {
      output(`- ${attachment}`)
    }

    output(`Inserting data into database...`)
    await insertInDataBase(...insertInput)
    output(`Grist data has been inserted into database successfully`)
  })
