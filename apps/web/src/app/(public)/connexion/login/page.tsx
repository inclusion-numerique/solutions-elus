import { getServerUrl } from '@sde/web/utils/baseUrl'
import { EmailSigninForm } from '@sde/web/app/(public)/connexion/EmailSigninForm'
import { getSessionUser } from '@sde/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { PublicWebAppConfig } from '@sde/web/webAppConfig'
import { dashboardRootPath } from '@sde/web/dashboard/dashboard'

const signinErrorMessage = (error?: string): string | undefined => {
  if (!error) {
    return error
  }

  if (error === 'OAuthAccountNotLinked') {
    return 'Vous venez de vous connecter par un nouvelle méthode. Par sécurité, veuillez utiliser la méthode de connexion que vous avez utilisé initiallement.'
  }
  return 'Erreur de connexion, veuillez réessayer.'
}

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
    <main role="main" id="content">
      <div className="fr-container fr-container--fluid fr-mb-md-14v">
        <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-xl-6 fr-mt-12v fr-mb-12v">
            <div className="fr-container fr-background-alt--grey fr-px-md-0 fr-pt-10v fr-pt-md-14v fr-pb-6v fr-pb-md-10v">
              <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
                <div className="fr-col-12 fr-col-md-9 fr-col-lg-8">
                  {error ? (
                    <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
                      <p>{signinErrorMessage(error)}</p>
                    </div>
                  ) : null}
                  <div>
                    <EmailSigninForm />
                  </div>
                  <hr className="fr-mt-6v" />
                  <h5 className="fr-mt-6v">
                    Espace réservé aux agents de l&apos;ANCT et du Ministère de
                    la Transition écologique et de la Cohésion des territoires
                  </h5>
                  <p>
                    Veuillez vous assurer que vous utilisez votre adresse
                    professionnelle pour la connexion a ce service. <br />
                    <br />
                    En cas de problèmes ou questions merci de contacter{' '}
                    <a href={`mailto:${PublicWebAppConfig.contactEmail}`}>
                      {PublicWebAppConfig.contactEmail}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SigninPage
