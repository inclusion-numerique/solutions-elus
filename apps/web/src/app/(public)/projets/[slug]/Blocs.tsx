import React from 'react'
import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import Icon from '@sde/web/components/Icon/Icon'
import styles from './Project.module.css'

const Blocs = ({ project }: { project: ProjectItem }) => (
  <div className={`${styles.blocs} fr-my-6w`}>
    <div className={styles.bloc}>
      <div className={styles.blocHeader}>
        <Icon name="fr-icon-trophy-line" />
        <h2>Objectifs</h2>
      </div>
      <ul>
        {project.goals.map((goal) => (
          <li key={goal}>{goal}</li>
        ))}
      </ul>
    </div>
    <div className={styles.bloc}>
      <div className={styles.blocHeader}>
        <Icon name="fr-icon-list-unordered" />
        <h2>Spécificités</h2>
      </div>
      <ul>
        {project.characteristics.map((characteristic) => (
          <li key={characteristic}>{characteristic}</li>
        ))}
      </ul>
    </div>
  </div>
)

export default Blocs
