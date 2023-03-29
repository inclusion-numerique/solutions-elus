import { initTRPC } from '@trpc/server'
import { ShareProjectFormDataValidation } from '@sde/web/shareProject/project'
import { prismaClient } from '@sde/web/prismaClient'
import { v4 } from 'uuid'
import { getProjectCategories } from '@sde/web/legacyProject/categories'

const t = initTRPC.create()

export const appRouter = t.router({
  createProject: t.procedure
    .input(ShareProjectFormDataValidation)
    .mutation(
      async ({
        input: {
          reference,
          community,
          quality,
          name,
          description,
          domain,
          email,
          partners,
          phone,
          tech,
          solution,
          dates,
          attachments,
        },
      }) => {
        const id = v4()
        const project = await prismaClient.shareProjectFormSubmission.create({
          data: {
            id,
            reference,
            community: {
              connectOrCreate: {
                where: { id: community.id },
                create: { ...community, zipcodes: community.zipcodes ?? [] },
              },
            },
            quality,
            name,
            description,
            domain,
            email,
            partners,
            phone,
            tech,
            solution,
            dates,
            attachments: { createMany: { data: attachments } },
          },
          include: { attachments: true, community: true },
        })

        return { project }
      },
    ),
})
// export type definition of API
export type AppRouter = typeof appRouter
