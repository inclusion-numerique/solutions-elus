'use client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SignoutPage = () => {
  const router = useRouter()
  const onConfirm = () => {
    signOut().then(() => router.replace('/'))
  }

  return (
    <main role="main" id="content">
      <div className="fr-container fr-container--fluid fr-mb-md-14v">
        <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-xl-6">
            <div className="fr-container fr-background-alt--grey fr-px-md-0 fr-pt-10v fr-pt-md-14v fr-pb-6v fr-pb-md-10v">
              <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
                <div className="fr-col-12 fr-col-md-9 fr-col-lg-8">
                  <h4>Solutions d&apos;élus</h4>
                  <hr />
                  <h5>
                    <span className="fr-icon-logout-box-r-line fr-mr-4v" />
                    Déconnexion
                  </h5>
                  <p>Êtes-vous sur de vouloir vous déconnecter ?</p>
                  <ul className="fr-btns-group">
                    <li>
                      <button
                        type="button"
                        className="fr-btn"
                        onClick={onConfirm}
                      >
                        Se déconnecter
                      </button>
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

export default SignoutPage
