import { getServerUrl } from '@sde/web/utils/baseUrl'
import { getSessionUser } from '@sde/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { PublicWebAppConfig } from '@sde/web/webAppConfig'
import { dashboardRootPath } from '@sde/web/dashboard/dashboard'

const VerifyPage = async ({
  searchParams: { callbackUrl, error } = {},
}: {
  searchParams?: { callbackUrl?: string; error?: string }
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
          <div className="fr-col-12 fr-col-md-8 fr-col-xl-6">
            <div className="fr-container fr-background-alt--grey fr-px-md-0 fr-pt-10v fr-pt-md-14v fr-pb-6v fr-pb-md-10v">
              <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
                <div className="fr-col-12 fr-col-md-9 fr-col-lg-8">
                  <h4>Connexion à Solutions d&apos;élus</h4>

                  <hr />
                  <h5>
                    <span className="fr-icon-mail-line" />
                    &nbsp;Rendez-vous dans votre boite email
                  </h5>
                  <p>
                    Un lien de connexion sécurisé vous a été envoyé par email.
                    Veuillez l&apos;utiliser pour vous connecter.
                  </p>
                  <p>Vous pouvez fermer cet onglet de navigation.</p>
                  <p>
                    En cas de problème ou de questions, merci de contacter{' '}
                    <a href={`mailto:${PublicWebAppConfig.contactEmail}`}>
                      {PublicWebAppConfig.contactEmail}
                    </a>
                    .
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

export default VerifyPage
