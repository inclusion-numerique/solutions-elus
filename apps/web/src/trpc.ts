import 'client-only'
import { AppRouter } from '@sde/web/server/rpc/rpcRouter'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>()
