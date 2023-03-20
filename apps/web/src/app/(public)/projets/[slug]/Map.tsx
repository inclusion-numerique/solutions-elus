import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import Link from 'next/link'
import React from 'react'

import parentStyles from './Project.module.css'

const Map = ({ project }: { project: ProjectItem }) => {
  return (
    <>
      <div className={parentStyles.bloc}>
        <h2 className="fr-text-title--blue-france">Le territoire</h2>
        <div className="fr-mt-4w">
          {`${project.localization.label}${
            project.localization.department
              ? ` (${project.localization.department})`
              : ''
          }`}
          <br />
          {project.localization.regionName}
          <br />
          {project.localization.departmentName}
        </div>
        <div className="fr-mt-2w">
          Population
          <br />
          {project.localization.population} Habitants
        </div>
        <div className="fr-mt-4w fr-text--lg">
          {project.localizationDescription}
        </div>
        <Link className="fr-btn" href="/projets">
          Voir tous les projets de la région
          <span className="fr-icon-arrow-right-line" />
        </Link>
      </div>
    </>
  )
}

export default Map
