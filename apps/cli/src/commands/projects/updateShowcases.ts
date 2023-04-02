import { Command } from '@commander-js/extra-typings'
import { prismaClient } from '@sde/web/prismaClient'
import { output } from '@sde/cli/output'

const showcases = [
  'des-produits-locaux-pour-la-restauration-collective',
  'la-martinique-une-association-de-recyclage-et-dautoreparation-soutenue-par-lanct',
  'le-numerique-au-coeur-du-projet-social-le-ccas-damiens',
  'tramayes-une-petite-ville-de-demain-energie-positive',
  'reinvestir-les-friches-pour-limiter-letalement-urbain',
  'renforcer-la-resilience-alimentaire-dune-petite-ville',
]

export const updateShowcases = new Command()
  .command('projects:update-showcases')
  .action(async () => {
    output(`🖼️  Configuring the showcase with ${showcases.length} projects`)
    try {
      await prismaClient.$transaction([
        prismaClient.project.updateMany({ data: { showcase: null } }),
        ...showcases.map((slug, showcase) =>
          prismaClient.project.update({
            data: {
              showcase,
            },
            where: {
              slug,
            },
          }),
        ),
      ])
    } catch (err) {
      output(
        `⚠️  Projects could not be configured for showcasing, ensure that those slugs exist :`,
      )
      for (const slug of showcases) {
        output(`- ${slug}`)
      }
      process.exit(1)
      return
    }

    output(
      `👍 ${showcases.length} projects have been configured for showcasing`,
    )
  })
