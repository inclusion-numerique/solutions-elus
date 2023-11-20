import { PropsWithChildren } from 'react'
import PublicHeader from '@sde/web/app/(public)/PublicHeader'
import PublicFooter from '@sde/web/app/(public)/PublicFooter'
import { CookieConsent } from '@sde/web/components/CookieConsent'

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
