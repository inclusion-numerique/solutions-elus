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

    await prismaClient.$transaction(async (transaction) => {
      await transaction.project.updateMany({ data: { showcase: null } })
      await Promise.all(
        showcases.map((slug, showcase) =>
          transaction.project
            .update({
              data: {
                showcase,
              },
              where: {
                slug,
              },
            })
            .catch(() => {
              output(`⚠️ Slug ${slug} not found`)
            }),
        ),
      )
    })

    output(
      `👍 ${showcases.length} projects have been configured for showcasing`,
    )
  })
