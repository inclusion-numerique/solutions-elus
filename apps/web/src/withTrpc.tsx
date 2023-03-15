import 'client-only'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { getServerUrl } from '@sde/web/utils/baseUrl'
import { trpc } from '@sde/web/trpc'
import { FunctionComponentWithChildren } from '@sde/web/utils/componentHelpers'
import { withProvider } from '@sde/web/utils/withProvider'

export const TrpcProvider: FunctionComponentWithChildren = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getServerUrl('/api/trpc')}`,
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

// HOC for using trpc in a subtree of client components
export const withTrpc = withProvider(TrpcProvider)
