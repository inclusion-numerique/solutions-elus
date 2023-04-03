import { redirect } from 'next/navigation'
import { getSessionUser } from '@sde/web/auth/getSessionUser'
import { Breadcrumbs } from '@sde/web/components/Breadcrumbs'
import { getServerUrl } from '@sde/web/utils/baseUrl'
import { dashboardRootPath } from '@sde/web/dashboard/dashboard'
import { Verify } from '@sde/web/app/(public)/connexion/verification/Verify'

const VerifyPage = async () => {
  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl(dashboardRootPath))
    return null
  }

  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <Verify />
    </>
  )
}

export default VerifyPage
