import React from 'react'
import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import Icon from '@sde/web/components/Icon/Icon'
import styles from './Project.module.css'

const Blocs = ({
  project,
  className,
}: {
  project: ProjectItem
  className?: string
}) => (
  <div className={`fr-grid-row fr-grid-row--gutters ${className}`}>
    <div className="fr-col-12 fr-col-lg-6 fr-py-0">
      <div className={`fr-p-6v fr-p-lg-8v ${styles.bloc}`}>
        <div className={styles.blocHeader}>
          <Icon name="fr-icon-trophy-line" />
          <h2 className="fr-ml-1w">Objectifs</h2>
        </div>
        <ul className="fr-mt-6v fr-mb-0">
          {project.goals.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>
      </div>
    </div>
    <div className="fr-col-12 fr-col-lg-6 fr-py-0">
      <div className={`fr-p-6v fr-p-lg-8v ${styles.bloc}`}>
        <div className={styles.blocHeader}>
          <Icon name="fr-icon-list-unordered" />
          <h2 className="fr-ml-1w">Spécificités</h2>
        </div>
        <ul className="fr-mt-6v fr-mb-0">
          {project.characteristics.map((characteristic) => (
            <li key={characteristic}>{characteristic}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)

export default Blocs
