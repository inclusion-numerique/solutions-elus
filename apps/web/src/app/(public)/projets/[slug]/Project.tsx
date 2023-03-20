import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import React from 'react'
import Header from './Header'
import Localization from './Localization'
import Blocs from './Blocs'
import Quotes from './Quotes'
import styles from './Project.module.css'

const Project = ({ project }: { project: ProjectItem }) => (
  <>
    <div className={`fr-grid-row ${styles.header} fr-mt-3w`}>
      <div className="fr-col-12 fr-col-lg-7">
        <Header project={project} />
      </div>
      <img
        className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-4"
        src={`/images/grist-attachments/${project.coverImage}`}
        alt={
          project.coverImageAlt ??
          `Photo illustrant le projet "${project.title}"`
        }
      />
    </div>
    <div className={`fr-grid-row ${styles.content}`}>
      <div className="fr-col-12 fr-col-lg-7">
        <div className="fr-text--lead fr-mb-6w">
          <b>{project.subtitle}</b>
        </div>
        {project.description}
        <Localization project={project} className="fr-hidden-lg fr-mt-6w" />
        <Blocs project={project} />
        <h2 className="fr-text-title--blue-france">Partenaires/cofinanceurs</h2>
        {project.funding}
        <div className={`${styles.metaInfos} fr-my-6w`}>
          <div>
            <p>Budget alloué au projet</p>
            <span className={styles.metaInfoValue}>{project.budget}</span>
          </div>
          {project.inaugurationDate && (
            <div>
              <p>Date d&lsquo;inauguration</p>
              <span className={styles.metaInfoValue}>
                {project.inaugurationDate.toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
        <Quotes project={project} />
        {project.program && (
          <>
            <div className={styles.separator} />
            <h2 className="fr-text-title--blue-france">
              Le programme {project.program.name}
            </h2>
            <div className="fr-text--lg">{project.program.description}</div>
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
      <div className="fr-col-4 fr-col-offset-1 ">
        <Localization project={project} className="fr-hidden fr-unhidden-lg" />
      </div>
    </div>
  </>
)

export default Project
