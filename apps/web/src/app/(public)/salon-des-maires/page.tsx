import Link from 'next/link'
import { Metadata } from 'next'
import { getShowcaseProjects } from '@sde/web/legacyProject/showcaseProjects'
import { Showcase } from '@sde/web/app/(public)/Showcase'
import { LeftHeader } from './LeftHeader'
import styles from '../PublicLayout.module.css'
import GetLeadsForm from './GetLeadsForm'

export const metadata: Metadata = {
  title: "Salon des maires",
  description: "Ensemble, partageons les solutions des territoires à l'occasion du Salon des Maires 2023",
  openGraph: {
    title: "Salon des maires",
    description: "Ensemble, partageons les solutions des territoires à l'occasion du Salon des Maires 2023",
  },
  twitter: {
    title: "Salon des maires",
    description: "Ensemble, partageons les solutions des territoires à l'occasion du Salon des Maires 2023",
  }
}

export default async function SalonDesMairesPage() {
  const projects = await getShowcaseProjects()

  return (
    <>
      <div
        className="fr-background-alt--blue-france"
        style={{ position: 'relative' }}
      >
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--gutters">
            <LeftHeader />

            <div className="fr-hidden fr-unhidden-md fr-col-md-4 fr-pl-4w">
              <div
                title="Photographie d'un village français"
                className={`${styles.asideCover}`}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        id="publier-mon-projet"
        className="fr-container fr-py-20v"
        style={{ position: 'relative' }}
      >
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
            <GetLeadsForm />
          </div>
        </div>
      </div>
      <div className="fr-pt-20v fr-pb-10v fr-background-alt--grey">
        <Showcase projects={projects} />
      </div>
    </>
  )
}
