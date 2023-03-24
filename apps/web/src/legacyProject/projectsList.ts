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
    orderBy: {
      created: 'desc',
    },
  })

export const getProject = (slug: string) =>
  prismaClient.project.findUnique({
    select: {
      program: {
        select: {
          name: true,
          description: true,
        },
      },
      localization: {
        select: {
          label: true,
          department: true,
          departmentName: true,
          regionName: true,
          population: true,
        },
      },
      slug: true,
      localizationDescription: true,
      longitude: true,
      latitude: true,
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
      budget: true,
      inaugurationDate: true,
      localActor1Image: true,
      localActor1Text: true,
      localActor1Name: true,
      localActor2Image: true,
      localActor2Text: true,
      localActor2Name: true,
      partner1Image: true,
      partner1Text: true,
      partner1Name: true,
      partner2Image: true,
      partner2Text: true,
      partner2Name: true,
    },
    where: {
      slug,
    },
  })

export type ProjectListItem = Awaited<
  ReturnType<typeof getProjectsList>
>[number]

export type ProjectItem = Awaited<ReturnType<typeof getProject>>
