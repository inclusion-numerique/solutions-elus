import { Command } from '@commander-js/extra-typings'
import { prismaClient } from '@sde/web/prismaClient'
import { output } from '@sde/cli/output'

const showcases = [
  // 'des-produits-locaux-pour-la-restauration-collective',
  // 'la-martinique-une-association-de-recyclage-et-dautoreparation-soutenue-par-lanct',
  // 'le-numerique-au-coeur-du-projet-social-le-ccas-damiens',
  // 'tramayes-une-petite-ville-de-demain-energie-positive',
  // 'reinvestir-les-friches-pour-limiter-letalement-urbain',
  // 'renforcer-la-resilience-alimentaire-dune-petite-ville',

  // Temp for full project grist table integration tests
  'lutte-contre-les-deserts-medicaux-avec-le-centre-de-sante-adour-madiran',
  'la-maison-des-patrimoines-une-pepiniere-dartisans-dart-et-dartistes',
  'la-traverse-projet-dhabitat-social-et-ecologique-intergenerationnelle-creon',
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
