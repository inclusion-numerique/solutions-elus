import { Command } from '@commander-js/extra-typings'
import { prismaClient } from '@sde/web/prismaClient'
import { output } from '@sde/cli/output'


export const listProjectCategories = new Command()
  .command('projects:list-categories')
  .action(async () => {

    const projects = await prismaClient.project.findMany()
    const categories = projects.flatMap(({ categories }) => categories)
    const uniqueCategories = [...new Set(categories)]
    output(uniqueCategories.join('\n'))
  })
