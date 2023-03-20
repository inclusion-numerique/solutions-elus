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

export const getProject = (slug: string) =>
  prismaClient.project.findUnique({
    select: {
      program: true,
      localization: true,
      created: true,
      title: true,
      categories: true,
      coverImage: true,
      coverImageAlt: true,
      subtitle: true,
      description: true,
      goals: true,
      characteristics: true,
      funding: true,
    },
    where: {
      slug
    }
  })

export type ProjectListItem = Awaited<
  ReturnType<typeof getProjectsList>
>[number]

export type ProjectItem = Awaited<ReturnType<typeof getProject>>
