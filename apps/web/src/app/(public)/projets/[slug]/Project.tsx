import Icon from '@sde/web/components/Icon/Icon'
import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import React from 'react'
import Map from './Map'
import styles from './Project.module.css'
import Quote from './Quote'

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
          <h2 className="fr-text-title--blue-france">
            Partenaires/cofinanceurs
          </h2>
          {project.funding}
          <div className={styles.metaInfos}>
            <div>
              <p>Budget alloué au projet</p>
              <span className={styles.metaInfoValue}>{project.budget}</span>
            </div>
            {project.inaugurationDate && (
              <div>
                <p>Date d'inauguration</p>
                <span className={styles.metaInfoValue}>
                  {project.inaugurationDate.toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
          <h2 className="fr-text-title--blue-france">
            La parole aux acteurs locaux
          </h2>
          <Quote
            image={project.localActor1Image}
            name={project.localActor1Name}
            text={project.localActor1Text}
          />
          <Quote
            image={project.localActor2Image}
            name={project.localActor2Name}
            text={project.localActor2Text}
          />
          <h2 className="fr-text-title--blue-france">
            La parole aux partenaires des collectivités
          </h2>
          <Quote
            image={project.partner1Image}
            name={project.partner1Name}
            text={project.partner1Text}
          />
          <Quote
            image={project.partner2Image}
            name={project.partner2Name}
            text={project.partner2Text}
          />
          <div className={styles.separator} />
          {project.program && (
            <>
              <h2 className="fr-text-title--blue-france">
                Le programme {project.program.name}
              </h2>
              <div className="fr-text--lg">TODO</div>
            </>
          )}
          <div className={styles.separator} />
          <h2 className="fr-text-title--blue-france">
            L’Agence nationale de la cohésion des territoires
          </h2>
          <div className="fr-text--lg">
            L’Agence nationale de la cohésion des territoires (ANCT) est un
            nouveau partenaire pour les collectivités locales : elle conçoit et
            anime des programmes d’appui nationaux pour mettre en œuvre les
            politiques publiques, dont Action Cœur de Ville fait partie. Dans ce
            cadre, elle est chargée de la mise en œuvre opérationnelle du
            programme et de son évaluation, du pilotage du centre de ressources
            collaboratif ainsi que de l’organisation des séminaires nationaux.
          </div>
        </div>
        <Map project={project} />
      </div>
    </>
  ) : null

export default Project
