import { Metadata } from 'next'
import { PublicWebAppConfig } from '@sde/web/webAppConfig'
import styles from '../PublicLayout.module.css'
import GetLeadsForm from './GetLeadsForm'

export const metadata: Metadata = {
  title: "Contact",
  description: "J'aimerais être recontacté pour partager le projet de ma collectivité.",
  openGraph: {
    title: "Contact",
    description: "J'aimerais être recontacté pour partager le projet de ma collectivité.",
    images: [
      {
        url: new URL("/images/village.webp", PublicWebAppConfig.mainLiveUrl),
        width: 1920,
        height: 1280,
        alt: PublicWebAppConfig.projectTitle,
      },
    ]
  },
  twitter: {
    card: "summary",
    title: "Contact",
    description: "J'aimerais être recontacté pour partager le projet de ma collectivité.",
    images: [
      {
        url: new URL("/images/village.webp", PublicWebAppConfig.mainLiveUrl),
        width: 1920,
        height: 1280,
        alt: PublicWebAppConfig.projectTitle,
      },
    ]
  }
}

export default function ContactPage() {
  return (
    <div className={`${styles.withImageBackground}`}>
      <div className="fr-container fr-py-20v" style={{ position: 'relative' }}>
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
            <h1 className={`fr-display--xs ${styles.titleOnBackground}`}>
              Ensemble, partageons les solutions des territoires
            </h1>
            <GetLeadsForm />
          </div>
        </div>
      </div>
    </div>
  )
}
