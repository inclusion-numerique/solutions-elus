import { PropsWithChildren } from 'react'
import { getSessionUser } from '@sde/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import PrivateHeader from '@sde/web/app/dashboard/PrivateHeader'
import PublicFooter from '@sde/web/app/(public)/PublicFooter'

const PrivateLayout = async ({ children, ...props }: PropsWithChildren) => {
  const user = await getSessionUser()

  if (!user) {
    return redirect('/auth/signin')
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <PrivateHeader user={user} />
      <div className="fr-container" style={{ flex: 1 }}>
        <div>{children}</div>
      </div>
      <PublicFooter />
    </div>
  )
}

export default PrivateLayout
