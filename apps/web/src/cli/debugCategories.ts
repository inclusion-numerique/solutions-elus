import { prismaClient } from '@sde/web/prismaClient'

const debugCategories = async () => {
  const projects = await prismaClient.project.findMany()
  const categories = projects.flatMap(({ categories }) => categories)
  const uniqueCategories = [...new Set(categories)]

  console.log('Legacy categories')
  console.log(uniqueCategories.sort())
}

debugCategories()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
