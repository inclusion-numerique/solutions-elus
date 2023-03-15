import { initTRPC, TRPCError } from '@trpc/server'
import { RpcContext } from '@sde/web/server/rpc/rpcContext'
import { SessionUser } from '@sde/web/auth/sessionUser'
import { ShareProjectFormDataValidation } from '@sde/web/shareProject/project'
import { prismaClient } from '@sde/web/prismaClient'
import { v4 } from 'uuid'
import z from 'zod'
import { District } from '@sde/web/projethoteque/legacyProjects'
import { scrapLegacyProjects } from '@sde/web/projethoteque/scrapLegacyProjects'
import { Category } from '@sde/web/anctProjects'

const t = initTRPC.context<RpcContext>().create()

const enforceUserIsLoggedIn = (
  user: SessionUser | null,
): user is SessionUser => {
  if (!user) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'User is not authenticated',
    })
  }
  return true
}

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
  findLegacyProject: t.procedure
    .input(
      z.object({
        districts: z.array(z.string()),
        categories: z.array(z.string()),
        limit: z.number().min(1).max(20).optional(),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ input: { districts, categories, cursor, limit = 20 } }) => scrapLegacyProjects({
        activeCategoriesFilters: categories as Category[],
        activeDistrictsFilters: districts as District[],
        limit,
        cursor,
      })),
})
// export type definition of API
export type AppRouter = typeof appRouter
