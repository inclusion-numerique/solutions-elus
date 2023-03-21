import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import React from 'react'
import Quote from './Quote'

const Quotes = ({ project }: { project: ProjectItem }) => {
  const hasLocalActorQuote = project.localActor1Text || project.localActor2Text
  const hasPartnerQuote = project.partner1Text || project.partner2Text

  return (
    <>
      {hasLocalActorQuote ? (
        <>
          <h2 className="fr-text-title--blue-france fr-mt-12v">
            La parole aux acteurs locaux
          </h2>
          <Quote
            className="fr-mt-4v"
            image={project.localActor1Image}
            name={project.localActor1Name}
            text={project.localActor1Text}
          />
          <Quote
            className="fr-mt-4v"
            image={project.localActor2Image}
            name={project.localActor2Name}
            text={project.localActor2Text}
          />
        </>
      ) : null}
      {hasPartnerQuote ? (
        <>
          <h2 className="fr-text-title--blue-france fr-mt-12v">
            La parole aux partenaires des collectivités
          </h2>
          <Quote
            className="fr-mt-4v"
            image={project.partner1Image}
            name={project.partner1Name}
            text={project.partner1Text}
          />
          <Quote
            className="fr-mt-4v"
            image={project.partner2Image}
            name={project.partner2Name}
            text={project.partner2Text}
          />
        </>
      ) : null}
    </>
  )
}

export default Quotes
