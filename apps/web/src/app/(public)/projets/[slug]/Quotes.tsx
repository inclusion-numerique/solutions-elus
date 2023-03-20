import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import React from 'react'
import Quote from './Quote'

const Quotes = ({ project }: { project: ProjectItem }) => (
  <>
    <h2 className="fr-text-title--blue-france">La parole aux acteurs locaux</h2>
    <Quote
      image={project.localActor1Image}
      name={project.localActor1Name}
      text={project.localActor1Text}
    />
    <Quote
      className="fr-mt-4w"
      image={project.localActor2Image}
      name={project.localActor2Name}
      text={project.localActor2Text}
    />
    {project.partner1Name && (
      <>
        <h2 className="fr-mt-6w fr-text-title--blue-france">
          La parole aux partenaires des collectivités
        </h2>
        <Quote
          image={project.partner1Image}
          name={project.partner1Name}
          text={project.partner1Text}
        />
        <Quote
          className="fr-mt-4w"
          image={project.partner2Image}
          name={project.partner2Name}
          text={project.partner2Text}
        />
      </>
    )}
  </>
)

export default Quotes
