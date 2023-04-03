import { Spinner } from '@sde/web/ui/Spinner'
import { Breadcrumbs } from '@sde/web/components/Breadcrumbs'
import { AuthCard } from '@sde/web/app/(public)/connexion/AuthCard'

function AuthLoading() {
  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <AuthCard>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            minHeight: 320,
            flex: 1,
          }}
        >
          <Spinner />
        </div>
      </AuthCard>
    </>
  )
}

export default AuthLoading
