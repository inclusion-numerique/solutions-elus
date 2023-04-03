import { getServerUrl } from '@sde/web/utils/baseUrl'
import { getSessionUser } from '@sde/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { dashboardRootPath } from '@sde/web/dashboard/dashboard'
import { Breadcrumbs } from '@sde/web/components/Breadcrumbs'
import { SigninPanel } from '@sde/web/app/(public)/connexion/login/SigninPanel'

const SigninPage = async ({
  searchParams: { error } = {},
}: {
  searchParams?: { error?: string }
}) => {
  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl(dashboardRootPath))
    return
  }

  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <SigninPanel error={error} />
    </>
  )
}

export default SigninPage
