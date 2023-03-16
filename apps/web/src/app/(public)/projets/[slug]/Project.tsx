import { Project as ProjectType } from '@prisma/client'
import React from 'react'

const Project = ({ project }: { project: ProjectType }) => {
  return (
    <>
      <p className="fr-text--sm">
        <b>Publié le {project.created.toLocaleDateString()}</b>
      </p>
      <h1>{project.title}</h1>
      {project.categories.map((category) => (
        <div className="fr-tag" key={category}>
          {category}
        </div>
      ))}
    </>
  )
}

export default Project
