import { prismaClient } from '@sde/web/prismaClient'

export const getShowcaseProjects = () =>
  prismaClient.project.findMany({
    where: {
      showcase: {
        not: null,
      },
    },
    select: {
      id: true,
      title: true,
      localization: {
        select: {
          label: true,
          department: true,
        },
      },
      slug: true,
      coverImage: true,
      coverImageAlt: true,
    },
    orderBy: { showcase: 'asc' },
  })

export type ShowcaseProject = Awaited<
  ReturnType<typeof getShowcaseProjects>
>[number]
