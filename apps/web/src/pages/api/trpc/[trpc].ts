import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from '@sde/web/server/rpc/rpcRouter'

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
})
