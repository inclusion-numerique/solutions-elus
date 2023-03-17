import Icon from '@sde/web/components/Icon/Icon'
import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import React from 'react'
import styles from './Project.module.css'

const Project = ({ project }: { project: ProjectItem }) =>
  project ? (
    <>
      <div className={styles.header}>
        <div>
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
          <div className={styles.metaInfos}>
            <div className={styles.metaInfo}>
              <Icon name="fr-icon-map-pin-2-line" />
              <div>
                <p>Localisation</p>
                {`${project.localization.label}${
                  project.localization.department
                    ? ` (${project.localization.department})`
                    : ''
                }`}
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
        </div>
        <img
          src={`/images/grist-attachments/${project.coverImage}`}
          alt={
            project.coverImageAlt ??
            `Photo illustrant le projet "${project.title}"`
          }
        />
      </div>
      <div className={styles.content}>
        <div>
          <div className="fr-text--lead">
            <b>{project.subtitle}</b>
          </div>
          {project.description}
          <div className={styles.blocs}>
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
          <h2>Partenaires/cofinanceurs</h2>
          {project.funding}
        </div>
      </div>
    </>
  ) : null

export default Project
