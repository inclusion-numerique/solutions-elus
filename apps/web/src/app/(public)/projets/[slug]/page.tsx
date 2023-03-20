import { getProject } from '@sde/web/legacyProject/projectsList'
import Link from 'next/link'
import React from 'react'
import { prismaClient } from '@sde/web/prismaClient'
import { notFound } from 'next/navigation'
import Project from './Project'

export const dynamic = 'force-static'

// populate the [slug] dynamic segment
export async function generateStaticParams() {
  const projects = await prismaClient.project.findMany({
    select: { slug: true },
  })

  return projects.map(({ slug }) => slug)
}

const ProjectPage = async ({ params }: { params: { slug: string } }) => {
  // Filtering and pagination is done in the frontend
  // We have only a small dataset of projects so this is way more performant
  try {
    const project = await getProject(params.slug)
    return (
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
                  {project.title}
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
    )
  } catch {
    notFound()
  }
}

export default ProjectPage
