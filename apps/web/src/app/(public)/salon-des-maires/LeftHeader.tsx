'use client'

import Link from "next/link"
import styles from '../PublicLayout.module.css'

export const LeftHeader = () => (
  <div className="fr-col-12 fr-col-md-7 fr-pr-md-1w">
    <h1
      className={`fr-text-title--blue-france fr-mt-20v ${styles.title}`}
    >
      Ensemble,
      <br />
      partageons les solutions
      <br />
      des territoires à l&apos;occasion
      <br />
      du Salon des Maires 2023
    </h1>
    <p className={`fr-mt-10v fr-pr-14v ${styles.lead}`}>
      « La transition écologique est le défi majeur pour notre pays.
      Les collectivités territoriales sont en première ligne pour y
      faire face. Le partage de solutions concrètes, des réussites
      faites ici ou là, est indispensable pour accélération la
      transition écologique de nos territoires. Ensemble, partageons
      les solutions. »
    </p>
    <p className="fr-text fr-mb-10v fr-text--bold">
      Christophe Béchu,
      <br />
      Ministre de la Transition écologique <br />
      et de la Cohésion des territoires
    </p>
    <div className="fr-btns-group fr-btns-group--inline-md fr-btns-group--lg fr-btns-group--icon-left fr-mb-10v">
      <Link
        href="/projets"
        className="fr-btn fr-icon-search-line"
      >
        Rechercher un projet
      </Link>
      <button
        onClick={() => {
          const share = document.getElementById('publier-mon-projet')
          window.scrollTo({
            top: share ? share.offsetTop : 936,
            behavior: 'smooth',
          })
          // share?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="fr-btn fr-btn--secondary fr-icon-arrow-down-line"
      >
        Publier mon projet
      </button>
    </div>
  </div>
)