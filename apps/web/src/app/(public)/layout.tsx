import { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import PublicHeader from '@sde/web/app/(public)/PublicHeader'
import PublicFooter from '@sde/web/app/(public)/PublicFooter'

const CookieConsent = dynamic(() => import('@sde/web/components/CookieConsent'), { ssr: false })

const PublicLayout = ({ children }: PropsWithChildren) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
    <CookieConsent />
    <PublicHeader />
    <div style={{ flex: 1 }}>
      <div>{children}</div>
    </div>
    <PublicFooter />
  </div>
)

export default PublicLayout
