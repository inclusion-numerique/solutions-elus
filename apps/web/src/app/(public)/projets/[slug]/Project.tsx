import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import React from 'react'
import { getProjectFilePath, getProjectPath } from '@sde/web/project/project'
import { formatInteger } from '@sde/web/utils/formatInteger'
import { dateAsDay } from '@sde/web/utils/dateAsDay'
import { textToParagraphs } from '@sde/web/utils/textParser'
import { getServerUrl } from '@sde/web/utils/baseUrl'
import Header from './Header'
import Localization from './Localization'
import Blocs from './Blocs'
import Quotes from './Quotes'
import styles from './Project.module.css'
import SocialNetworks from './SocialNetworks'

const Project = ({ project }: { project: ProjectItem }) => {
  const coverPicture = (
    <picture>
      <img
        src={getProjectFilePath(project.coverImage)}
        className="fr-mt-lg-8v"
        alt={
          project.coverImageAlt ??
          `Photo illustrant le projet "${project.title}"`
        }
      />
    </picture>
  )

  return (
    <>
      <div className="fr-grid-row fr-pb-16v">
        <div className="fr-col-12 fr-col-lg-7 fr-pt-4v fr-pt-lg-12v">
          <div
            className={`fr-hidden-lg fr-col-12 fr-col-offset-lg-1 fr-col-lg-4  ${styles.coverImageContainer}`}
          >
            {coverPicture}
          </div>
          <Header project={project} />
          {textToParagraphs(project.subtitle).map((paragraph, index) => (
            <p
              key={paragraph}
              className={`fr-text--xl fr-text--bold  ${
                index === 0 ? 'fr-mt-12v' : ''
              }`}
            >
              {paragraph}
            </p>
          ))}
          {textToParagraphs(project.description).map((paragraph, index) => (
            <p
              key={paragraph}
              className={`fr-text--lg ${index === 0 ? 'fr-mt-12v' : ''}`}
            >
              {paragraph}
            </p>
          ))}

          <SocialNetworks
            className="fr-hidden-lg fr-mt-12v"
            url={getServerUrl(getProjectPath(project))}
          />
          <Localization project={project} className="fr-hidden-lg fr-mt-12v" />
          <Blocs className="fr-mt-6v" project={project} />
          {project.funding ? (
            <>
              <h2 className="fr-text-title--blue-france fr-mt-12v">
                Partenaires/cofinanceurs
              </h2>
              <p className="fr-text--lg">
                {textToParagraphs(project.funding).map((paragraph, index) => (
                  <>
                    {index === 0 ? null : <br key={`br_${paragraph}`} />}
                    <span key={paragraph}>{paragraph}</span>
                  </>
                ))}
              </p>
            </>
          ) : null}
          {project.budget || project.inaugurationDate ? (
            <>
              <div className={`${styles.metaInfos} fr-mt-12v`}>
                {project.budget ? (
                  <div style={{ flex: 1 }}>
                    <p>Budget alloué au projet</p>
                    <p className={styles.metaInfoValue}>
                      {formatInteger(project.budget)}&nbsp;€
                    </p>
                  </div>
                ) : null}
                {project.inaugurationDate ? (
                  <div style={{ flex: 1 }}>
                    <p>Date d&lsquo;inauguration</p>
                    <p className={styles.metaInfoValue}>
                      {dateAsDay(project.inaugurationDate)}
                    </p>
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
          <Quotes project={project} />
          {project.program && (
            <>
              <h2 className="fr-text-title--blue-france fr-mt-8v">
                Le programme {project.program.name}
              </h2>
              {textToParagraphs(project.program.description).map(
                (paragraph) => (
                  <p key={paragraph} className="fr-text--lg">
                    {paragraph}
                  </p>
                ),
              )}
              <hr className="fr-mt-12v" />
            </>
          )}
          <h2 className="fr-text-title--blue-france fr-mt-8v">
            L’Agence nationale de la cohésion des territoires
          </h2>
          <p className="fr-text--lg">
            L’Agence nationale de la cohésion des territoires (ANCT) est un
            nouveau partenaire pour les collectivités locales : elle conçoit et
            anime des programmes d’appui nationaux pour mettre en œuvre les
            politiques publiques, dont Action Cœur de Ville fait partie.
          </p>
          <p className="fr-text--lg">
            Dans ce cadre, elle est chargée de la mise en œuvre opérationnelle
            du programme et de son évaluation, du pilotage du centre de
            ressources collaboratif ainsi que de l’organisation des séminaires
            nationaux.
          </p>
        </div>
        <div
          className="fr-hidden fr-unhidden-lg fr-col-4 fr-col-offset-1 fr-pt-12v"
          style={{ flexDirection: 'column' }}
        >
          <div className={styles.coverImageContainer}>{coverPicture}</div>
          <SocialNetworks
            className="fr-mt-8v"
            url={getServerUrl(getProjectPath(project))}
          />
          <Localization className="fr-mt-8v" project={project} />
        </div>
      </div>
    </>
  )
}

export default Project
