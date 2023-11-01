import React from 'react'
import Link from 'next/link'
import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import { formatInteger } from '@sde/web/utils/formatInteger'
import { textToParagraphs } from '@sde/web/utils/textParser'
import Map from './Map'
import styles from './Localization.module.css'

const Localization = ({
  project,
  collectiviteUrl,
  className,
}: {
  project: ProjectItem
  collectiviteUrl?: string;
  className?: string
}) => (
  <div className={className ?? ''}>
    {project.latitude && project.longitude ? (
      <Map latitude={project.latitude} longitude={project.longitude} />
    ) : null}
    <div className={`fr-p-6v ${styles.bloc}`}>
      <h2 className="fr-mb-0 fr-text-title--blue-france">Le territoire</h2>
      {project.localization.echelon === 'commune' ?
        (
          <p className="fr-mt-6v fr-mb-0 fr-text--bold">
            <a href={collectiviteUrl} target="_blank">
              {project.localization.label}
            </a>
          </p>
        ) : (
          <p className="fr-mt-6v fr-mb-0 fr-text--bold">
            {project.localization.label}
          </p>
        )
      }
      {/* No need to display departments for projects with region echelon */}
      {project.localization.echelon !== 'region' &&
      project.localization.departmentName ? (
        <p className="fr-mb-0 fr-text--bold">
          {project.localization.departmentName} (
          {project.localization.department})
        </p>
      ) : null}
      {/* Projects with region echelon have the same label as region name */}
      {project.localization.echelon !== 'region' &&
      project.localization.regionName ? (
        <p className="fr-mb-0 fr-text--bold">
          {project.localization.regionName.toUpperCase()}
        </p>
      ) : null}

      {project.localization.population ? (
        <>
          <p className="fr-mb-0 fr-mt-4v fr-text-mention--grey">Population</p>
          <p className="fr-mb-0 fr-text--medium">
            {formatInteger(project.localization.population)} Habitants
          </p>
        </>
      ) : null}
      {project.localizationDescription ? (
        <div className="fr-mt-4v">
          {textToParagraphs(project.localizationDescription).map(
            (paragraph) => (
              <p key={paragraph} className="fr-text--lg">
                {paragraph}
              </p>
            ),
          )}
        </div>
      ) : null}
      {project.localization.regionName ? (
        <div className="fr-btns-group">
          <Link
            className="fr-btn fr-mb-0 fr-mt-8v"
            href={`/projets?regions=${project.localization.regionName}`}
          >
            Voir les projets de la région
          </Link>
        </div>
      ) : null}
    </div>
  </div>
)

export default Localization
