import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import { getCityWithDepartment } from '@sde/web/project/project'
import Map from './Map'
import styles from './Localization.module.css'

const Localization = ({
  project,
  className,
}: {
  project: ProjectItem
  className: string
}) => (
  <div>
    <div className={className}>
      {project.latitude && project.longitude && (
        <Map latitude={project.latitude} longitude={project.longitude} />
      )}
      <div className={styles.bloc}>
        <h2 className="fr-text-title--blue-france">Le territoire</h2>
        <div className="fr-mt-4w">
          {getCityWithDepartment(project.localization)}
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
        <Link
          className="fr-btn"
          href={`/projets?regions=${project.localization.regionName}`}
        >
          Voir tous les projets de la région
          <span className="fr-icon-arrow-right-line" />
        </Link>
      </div>
    </div>
  </div>
)

export default Localization
