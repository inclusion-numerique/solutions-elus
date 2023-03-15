import { listProjects } from '@sde/web/projethoteque/scrapper'
import { prismaClient } from '@sde/web/prismaClient'

const updateLegacyProjectsFromProjethotequeWebsite = async () => {
  console.log('👓 Fetching projects from anct website')
  const projectsList = await listProjects()
  console.log(`📁 Found ${projectsList.projectItems.length} projects`)
  if (projectsList.projectItems.length < 90) {
    throw new Error(
      'Seems like there is not enough projects found. Aborting to prevent deletion.',
    )
  }
  console.log('💾 Updating database')
  await prismaClient.$transaction([
    prismaClient.project.deleteMany(),
    prismaClient.project.createMany({
      skipDuplicates: false,
      data: projectsList.projectItems,
    }),
  ])

  console.log(
    `👍 The ${projectsList.projectItems.length} projects have been saved in database`,
  )

  // Adding showcases
  const showcases = [
    'des-produits-locaux-pour-la-restauration-collective-322',
    'la-martinique-une-association-de-recyclage-et-dautoreparation-soutenue-par-lanct-181',
    'le-numerique-au-coeur-du-projet-social-le-ccas-damiens-350',
    'tramayes-une-petite-ville-de-demain-energie-positive-522',
    'reinvestir-les-friches-pour-limiter-letalement-urbain-763',
    'renforcer-la-resilience-alimentaire-dune-petite-ville-974',
  ]

  console.log(`🖼️ Configuring the showcase with ${showcases.length} projects`)

  await Promise.all(
    showcases.map((slug, showcase) =>
      prismaClient.project.update({
        data: {
          showcase,
        },
        where: {
          slug,
        },
      }),
    ),
  )

  console.log(
    `👍 ${showcases.length} projects have been configured for showcasing`,
  )
}

updateLegacyProjectsFromProjethotequeWebsite()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
