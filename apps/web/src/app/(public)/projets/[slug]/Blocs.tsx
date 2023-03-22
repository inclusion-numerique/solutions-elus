import React from 'react'
import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import Icon from '@sde/web/components/Icon/Icon'
import styles from './Project.module.css'

const Blocs = ({
  project: { goals, characteristics },
  className,
}: {
  project: ProjectItem
  className?: string
}) => {
  const hasGoals = goals.length > 0
  const hasCharacteristics = characteristics.length > 0
  if (!hasGoals && !hasCharacteristics) {
    return null
  }

  return (
    <div className={`fr-grid-row fr-grid-row--gutters ${className}`}>
      {hasGoals ? (
        <div className="fr-col-12 fr-col-lg-6 fr-py-0">
          <div className={`fr-p-6v fr-p-lg-8v ${styles.bloc}`}>
            <div className={styles.blocHeader}>
              <Icon name="fr-icon-trophy-line" />
              <h2 className="fr-ml-1w">Objectifs</h2>
            </div>
            <ul className="fr-mt-6v fr-mb-0">
              {goals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
      {hasCharacteristics ? (
        <div className="fr-col-12 fr-col-lg-6 fr-py-0">
          <div
            className={`fr-p-6v fr-p-lg-8v ${
              hasGoals ? 'fr-mt-6v' : ''
            } fr-mt-lg-0 ${styles.bloc}`}
          >
            <div className={styles.blocHeader}>
              <Icon name="fr-icon-list-unordered" />
              <h2 className="fr-ml-1w">Spécificités</h2>
            </div>
            <ul className="fr-mt-6v fr-mb-0">
              {characteristics.map((characteristic) => (
                <li key={characteristic}>{characteristic}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Blocs
