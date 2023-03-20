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

    // To avoid pagination logic (50 000 records and 500 max items per page)
    // And long running time, only fetch required localizations
    const localisationIds = [
      ...new Set(
        gristProjects
          .map(({ fields: { Localisation } }) => Localisation)
          .filter(isDefinedAndNotNull),
      ),
    ]
    const localisations = await listLocalisations({
      filter: { id: localisationIds },
    })
    output(`Downloaded grist data`)
    output(`- ${gristProjects.length} projects`)
    output(`- ${programs.length} programs`)
    output(`- ${thematiques.length} thematiques`)
    output(`- ${localisations.length} localisations (only relevant ones)`)

    const attachments = await downloadAttachments(gristProjects)
    await insertInDataBase(
      gristProjects,
      localisations,
      programs,
      thematiques,
      attachments,
    )
    output(`Grist data has been inserted into database`)
  })
