import { prismaClient } from '@sde/web/prismaClient'
import { District } from '@sde/web/projethoteque/legacyProjects'
import { Category } from '@sde/web/anctProjects'

export const scrapLegacyProjects = async ({
  activeCategoriesFilters,
  activeDistrictsFilters,
  limit,
  cursor,
}: {
  activeCategoriesFilters: Category[]
  activeDistrictsFilters: District[]
  limit: number
  cursor?: string
}) => {
  const where = {
    ...(activeCategoriesFilters.length === 0
      ? null
      : {
          categories: {
            hasSome: activeCategoriesFilters,
          },
        }),
    ...(activeDistrictsFilters.length === 0
      ? null
      : {
          district: {
            in: activeDistrictsFilters,
          },
        }),
  }

  const [projects, count] = await Promise.all([
    prismaClient.project.findMany({
      where,
      take: limit + 1, // get an extra item at the end which we'll use as next cursor
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: 'asc' },
    }),
    prismaClient.project.count({
      where,
    }),
  ])

  if (limit && projects.length > limit) {
    const nextItem = projects.pop()

    return {
      projects,
      nextCursor: nextItem?.id,
      count,
    }
  }

  return {
    projects,
    count,
    nextCursor: undefined,
  }
}
