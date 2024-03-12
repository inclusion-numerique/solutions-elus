import { prismaClient } from '@sde/web/prismaClient'

export const getLandingsList = () =>
  prismaClient.landingPageSEO.findMany({
    select: {
      slug: true,
    },
  })

export const getLanding = (slug: string) =>
  prismaClient.landingPageSEO.findUnique({
    where: {
      slug,
    },
    select: {
      slug: true,
      title: true,
      description: true,
      text: true,
    },
  })

export type LandingListItem = Awaited<
  ReturnType<typeof getLandingsList>
>[number]

export type LandingItem = Exclude<Awaited<ReturnType<typeof getLanding>>, null>
