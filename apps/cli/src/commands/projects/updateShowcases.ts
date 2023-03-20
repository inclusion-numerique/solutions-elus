import { Command } from '@commander-js/extra-typings'
import { prismaClient } from '@sde/web/prismaClient'
import { output } from '@sde/cli/output'

const showcases = [
  // 'des-produits-locaux-pour-la-restauration-collective-322',
  // 'la-martinique-une-association-de-recyclage-et-dautoreparation-soutenue-par-lanct-181',
  // 'le-numerique-au-coeur-du-projet-social-le-ccas-damiens-350',
  // 'tramayes-une-petite-ville-de-demain-energie-positive-522',
  // 'reinvestir-les-friches-pour-limiter-letalement-urbain-763',
  // 'renforcer-la-resilience-alimentaire-dune-petite-ville-974',

  // Temp for full project grist table integration tests
  'lutte-contre-les-deserts-medicaux-avec-le-centre-de-sante-adour-madiran-1075',
  'la-maison-des-patrimoines-une-pepiniere-dartisans-dart-et-dartistes-1037',
  'la-traverse-projet-dhabitat-social-et-ecologique-intergenerationnelle-creon-1063',
]

export const updateShowcases = new Command()
  .command('projects:update-showcases')
  .action(async () => {
    output(`🖼️ Configuring the showcase with ${showcases.length} projects`)

    await prismaClient.$transaction(async (transaction) => {
      await transaction.project.updateMany({ data: { showcase: null } })
      await Promise.all(
        showcases.map((slug, showcase) =>
          transaction.project.update({
            data: {
              showcase,
            },
            where: {
              slug,
            },
          }),
        ),
      )
    })

    output(
      `👍 ${showcases.length} projects have been configured for showcasing`,
    )
  })
