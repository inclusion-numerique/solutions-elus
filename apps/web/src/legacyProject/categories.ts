import { prismaClient } from '@sde/web/prismaClient'

export const getProjectCategories = async () => {
  const results = await prismaClient.project.findMany({
    select: {
      categories: true,
    },
  })

  if (!results) {
    return []
  }

  return results
    .flatMap((result) => result.categories)
    .map((category) => category.trim())
    .filter(
      (category, index, categories) => categories.indexOf(category) === index,
    )
    .sort((a, b) => a.localeCompare(b))
}
