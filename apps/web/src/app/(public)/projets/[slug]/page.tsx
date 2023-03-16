import { getProject } from '@sde/web/legacyProject/projectsList'
import Link from 'next/link'
import React from 'react'
import Project from './Project'

const ProjectPage = async ({ params }: { params: { slug: string } }) => {
  const project = await getProject(params.slug)
  return project ? (
    <div className="fr-container">
      <nav
        role="navigation"
        className="fr-breadcrumb"
        aria-label="vous êtes ici :"
      >
        <button
          className="fr-breadcrumb__button"
          aria-expanded="false"
          aria-controls="breadcrumb-1"
        >
          Voir le fil d’Ariane
        </button>
        <div className="fr-collapse" id="breadcrumb-1">
          <ol className="fr-breadcrumb__list">
            <li>
              <Link className="fr-breadcrumb__link" href="/">
                Accueil
              </Link>
            </li>
            <li>
              <Link className="fr-breadcrumb__link" href="/projets/">
                Voir les projets
              </Link>
            </li>
            <li>
              <a className="fr-breadcrumb__link" aria-current="page">
                {project?.title}
              </a>
            </li>
          </ol>
        </div>
      </nav>
      <Link
        className="fr-btn fr-btn--tertiary fr-btn--icon-left fr-icon-arrow-left-line"
        href="/projets"
      >
        Retour à la liste des projets
      </Link>
      <Project project={project} />
    </div>
  ) : null
}

export default ProjectPage
