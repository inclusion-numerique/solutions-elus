import React from 'react'
import Link from 'next/link'
import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import Icon from '@sde/web/components/Icon/Icon'
import { getProjectLocalizationLabelWithDepartments } from '@sde/web/project/project'
import { dateAsDay } from '@sde/web/utils/dateAsDay'
import styles from './Project.module.css'
import { thematiques } from '../../[filter]/data'

const Header = ({ project }: { project: ProjectItem }) => (
  <>
    <p className="fr-text--sm fr-text--bold fr-pt-6v fr-mb-4v">
      Publié le {dateAsDay(project.created)}
    </p>
    <h1 className="fr-mb-2v">{project.title}</h1>
    <ul className="fr-tags-group fr-mt-4v">
      {project.categories.map((category) => (
        <li key={category}>
          <Link
            className="fr-tag"
            aria-pressed="false"
            href={`/thematique/${thematiques.find(thematique => thematique.name === category)?.slug}`}
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
    <div className={`${styles.metaInfos} fr-mt-12v`}>
      <div className={styles.metaInfo}>
        <Icon name="fr-icon-map-pin-2-line" />
        <div className="fr-ml-1v">
          <p className="fr-mb-0">Localisation</p>
          <p className="fr-mb-0">
            {getProjectLocalizationLabelWithDepartments(project.localization)}
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
