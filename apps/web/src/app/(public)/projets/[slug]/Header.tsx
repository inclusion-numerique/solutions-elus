import React from 'react'
import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import Icon from '@sde/web/components/Icon/Icon'
import { getCityWithDepartment } from '@sde/web/project/project'
import styles from './Project.module.css'

const Header = ({ project }: { project: ProjectItem }) => (
  <>
    <p className="fr-text--sm">
      <b>Publié le {project.created.toLocaleDateString()}</b>
    </p>
    <h1>{project.title}</h1>
    {project.categories.map((category) => (
      <div
        className="fr-tag fr-mt-2v fr-mr-2v"
        key={category}
        aria-pressed="false"
      >
        {category}
      </div>
    ))}
    <div className={`${styles.metaInfos} fr-my-6w`}>
      <div className={styles.metaInfo}>
        <Icon name="fr-icon-map-pin-2-line" />
        <div>
          <p>Localisation</p>
          {getCityWithDepartment(project.localization)}
        </div>
      </div>
      {project.program && (
        <div className={styles.metaInfo}>
          <Icon name="fr-icon-survey-line" />
          <div>
            <p>Programme</p>
            {project.program.name}
          </div>
        </div>
      )}
    </div>
  </>
)

export default Header
