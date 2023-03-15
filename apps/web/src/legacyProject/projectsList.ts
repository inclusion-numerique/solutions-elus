import { prismaClient } from '@sde/web/prismaClient'

export const getProjectsList = () =>
  prismaClient.project.findMany({
    select: {
      program: true,
      categories: true,
      district: true,
      id: true,
      title: true,
      city: true,
      imageAlt: true,
      imagePath: true,
      slug: true,
    },
  })

export type ProjectListItem = Awaited<
  ReturnType<typeof getProjectsList>
>[number]
