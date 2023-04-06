import { inferAsyncReturnType } from '@trpc/server'
import { CreateNextContextOptions } from '@trpc/server/src/adapters/next'

export const createContext = async ({
  req,
  res,
}: CreateNextContextOptions) => ({ req, res })

export type RpcContext = inferAsyncReturnType<typeof createContext>
