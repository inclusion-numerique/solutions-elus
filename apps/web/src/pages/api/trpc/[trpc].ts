import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from '@sde/web/server/rpc/rpcRouter'
import { createContext } from '@sde/web/server/rpc/rpcContext'

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
