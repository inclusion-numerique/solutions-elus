import fs from "node:fs"
import { Command } from '@commander-js/extra-typings'
import { output } from '@sde/cli/output'
import { gristOutputFile } from "./convertDrupalProjectsToGristProjectFields"
import { insertInDataBase, listProjectRecords } from "@sde/cli/grist/grist"

export const downloadGristProjectFields = new Command()
  .command('projects:grist:download')
  .action(async () => {

    if (!fs.existsSync(gristOutputFile)) {
      output(`${gristOutputFile} does not exists`)
      return
    }
    
    const gristProjects = await listProjectRecords()

    await insertInDataBase(gristProjects)
    output(`${gristProjects.length} projects downloaded from grist`)
  })
