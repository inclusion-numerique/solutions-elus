import Link from 'next/link'

const errorMessage = (error?: string): string | undefined => {
  if (error === 'Verification') {
    return "Le lien de connexion n'est plus valide. Il a peut-être déjà été utilisé ou est expiré."
  }

  return 'Une erreur est survenue lors de la connexion. Veuillez réessayer.'
}

const ErrorPage = async ({
  searchParams: { error } = {},
}: {
  searchParams?: { error?: string }
}) => {
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
                    <span className="fr-icon-error-line" />
                    &nbsp;Connexion impossible
                  </h5>
                  <p>{errorMessage(error)}</p>
                  <p>
                    Ce service est reservé aux agents de l&apos;ANCT, merci de
                    vous assurer que vous avez utilisé votre adresse email ANCT
                    pour vous connecter.
                  </p>
                  <ul className="fr-btns-group">
                    <li>
                      <Link
                        href="/auth/signin"
                        target="_self"
                        className="fr-btn"
                      >
                        Retour
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ErrorPage
