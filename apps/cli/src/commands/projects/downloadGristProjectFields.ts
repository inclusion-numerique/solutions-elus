import { Command } from '@commander-js/extra-typings'
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

export const downloadGristProjectFields = new Command()
  .command('projects:grist:download')
  .action(async () => {
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

    // To avoid pagination logic (50 000 records and 500 max items per page)
    // And long running time, only fetch required localizations
    const localisationIds = [
      ...new Set(
        gristProjects.records
          .map(({ fields: { Localisation } }) => Localisation)
          .filter(isDefinedAndNotNull),
      ),
    ]
    const localisations = await listLocalisations({
      filter: { id: localisationIds },
    })
    if (gristProjects.invalidRecords.length > 0) {
      output(
        `⚠️ There was ${gristProjects.invalidRecords.length}/${
          gristProjects.records.length + gristProjects.invalidRecords.length
        } invalid projects in Grist dataset that will NOT be imported`,
      )
    }
    output(`Downloaded grist data`)
    output(`- ${gristProjects.records.length} projects`)
    output(`- ${programs.records.length} programs`)
    output(`- ${thematiques.records.length} thematiques`)
    output(
      `- ${localisations.records.length} localisations (only relevant ones)`,
    )

    const attachments = await downloadAttachments(gristProjects.records)
    await insertInDataBase(
      gristProjects.records,
      localisations.records,
      programs.records,
      thematiques.records,
      attachments,
    )
    output(`Grist data has been inserted into database`)
  })
