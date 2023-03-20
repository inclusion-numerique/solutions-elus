import { prismaClient } from '@sde/web/prismaClient'

export const getProjectsList = () =>
  prismaClient.project.findMany({
    select: {
      program: {
        select: {
          name: true,
          politique: true,
        },
      },
      categories: true,
      id: true,
      title: true,
      localization: {
        select: {
          label: true,
          department: true,
          departmentName: true,
          region: true,
          regionName: true,
          population: true,
        },
      },
      latitude: true,
      longitude: true,
      coverImage: true,
      coverImageAlt: true,
      slug: true,
    },
  })

export type ProjectListItem = Awaited<
  ReturnType<typeof getProjectsList>
>[number]
