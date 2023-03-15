import { prismaClient } from '@sde/web/prismaClient'

const debugCategories = async () => {
  const legacyProjects = await prismaClient.legacyProject.findMany()
  const categories = legacyProjects.map(({ categories }) => categories).flat()
  const uniqueCategories = [...new Set(categories)]

  console.log('Legacy categories')
  console.log(uniqueCategories.sort())
}

debugCategories()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
