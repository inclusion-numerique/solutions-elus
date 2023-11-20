import { Metadata } from 'next'
import styles from '@sde/web/app/(public)/PublicLayout.module.css'
import ShareProjectForm from '@sde/web/app/(public)/ShareProjectForm'

export const metadata: Metadata = {
  title: "Partager",
  description: "Partagez ici vos projets et réalisations en tant qu'élu",
  openGraph: {
    title: "Partager",
    description: "Partagez ici vos projets et réalisations en tant qu'élu",
  },
  twitter: {
    title: "Partager",
    description: "Partagez ici vos projets et réalisations en tant qu'élu",
  }
}

export default function ShareProjectPage() {
  return (
    <div className={`${styles.withImageBackground}`}>
      <div className="fr-container fr-py-20v" style={{ position: 'relative' }}>
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
            <h1 className={`fr-display--xs ${styles.titleOnBackground}`}>
              Ensemble, partageons les solutions des territoires
            </h1>
            <ShareProjectForm />
          </div>
        </div>
      </div>
    </div>
  )
}
