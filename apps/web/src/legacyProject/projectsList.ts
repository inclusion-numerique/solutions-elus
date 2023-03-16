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
      coverImage: true,
      coverImageAlt: true,
      slug: true,
    },
  })

export const getProject = (slug: string) =>
  prismaClient.project.findUnique({
    where: {
      slug
    }
  })

export type ProjectListItem = Awaited<
  ReturnType<typeof getProjectsList>
>[number]
