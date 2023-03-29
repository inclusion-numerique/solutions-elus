import React from 'react'
import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import Icon from '@sde/web/components/Icon/Icon'
import { getCityWithDepartment } from '@sde/web/project/project'
import { dateAsDay } from '@sde/web/utils/dateAsDay'
import styles from './Project.module.css'

const Header = ({ project }: { project: ProjectItem }) => (
  <>
    <p className="fr-text--sm fr-text--bold fr-pt-6v fr-mb-4v">
      Publié le {dateAsDay(project.created)}
    </p>
    <h1 className="fr-mb-2v">{project.title}</h1>
    {project.categories.map((category) => (
      <div
        className="fr-tag fr-mt-2v fr-mr-2v"
        key={category}
        aria-pressed="false"
      >
        {category}
      </div>
    ))}
    <div className={`${styles.metaInfos} fr-mt-12v`}>
      <div className={styles.metaInfo}>
        <Icon name="fr-icon-map-pin-2-line" />
        <div className="fr-ml-1v">
          <p className="fr-mb-0">Localisation</p>
          <p className="fr-mb-0">
            {getCityWithDepartment(project.localization)}
          </p>
        </div>
      </div>
      {project.program && (
        <div className={styles.metaInfo}>
          <Icon name="fr-icon-survey-line" />
          <div className="fr-ml-1v">
            <p className="fr-mb-0">Programme</p>
            <p className="fr-mb-0">{project.program.name}</p>
          </div>
        </div>
      )}
    </div>
  </>
)

export default Header
