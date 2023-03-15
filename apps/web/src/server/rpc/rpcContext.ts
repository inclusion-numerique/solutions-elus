import { inferAsyncReturnType, TRPCError } from '@trpc/server'
import { CreateNextContextOptions } from '@trpc/server/src/adapters/next'
import { sessionUserFromSessionToken } from '@sde/web/auth/sessionUserFromSessionToken'
import { sessionTokenFromCookies } from '@sde/web/security/authentication'

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const sessionToken = sessionTokenFromCookies(req.cookies)

  if (!sessionToken) {
    return { req, res, user: null }
  }
  const user = await sessionUserFromSessionToken(sessionToken)
  if (!user) {
    // Not Signed in
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Not authorized.',
    })
  }
  return { req, res, user }
}

export type RpcContext = inferAsyncReturnType<typeof createContext>
