import fs from "node:fs"
import { Command } from '@commander-js/extra-typings'
import { output } from '@sde/cli/output'
import { gristOutputFile } from "./convertDrupalProjectsToGristProjectFields"
import { insertInDataBase, listLocalisations, listPrograms, listProjectRecords, listThematiques } from "@sde/cli/grist/grist"

export const downloadGristProjectFields = new Command()
  .command('projects:grist:download')
  .action(async () => {

    if (!fs.existsSync(gristOutputFile)) {
      output(`${gristOutputFile} does not exists`)
      return
    }
    
    const [gristProjects, localisations, programs, thematiques] = await Promise.all(
      [listProjectRecords(), listLocalisations(), listPrograms(), listThematiques()]
    )

    await insertInDataBase(gristProjects, localisations, programs, thematiques)
    output(`${gristProjects.length} projects downloaded from grist`)
  })
