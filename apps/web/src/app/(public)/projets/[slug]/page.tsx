import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { getProject } from '@sde/web/legacyProject/projectsList'
import { prismaClient } from '@sde/web/prismaClient'
import { getServerUrl } from '@sde/web/utils/baseUrl'
import { getProjectPath } from '@sde/web/project/project'
import Project from './Project'

export const dynamic = 'force-static'

// populate the [slug] dynamic segment
export async function generateStaticParams() {
  const projects = await prismaClient.project.findMany({
    select: { slug: true },
  })

  return projects.map(({ slug }) => slug)
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  try {
    const project = await getProject(params.slug)
    return {
      openGraph: {
        type: 'website',
        url: getServerUrl(getProjectPath(project)),
        title: project.title,
        description: project.subtitle,
        images: [
          {
            url: getServerUrl(project.coverImage),
            alt: project.coverImageAlt || undefined,
          },
        ],
      },
    }
  } catch {
    return {}
  }
}

const ProjectPage = async ({ params }: { params: { slug: string } }) => {
  try {
    const project = await getProject(params.slug)
    return (
      <div className="fr-container">
        <nav
          role="navigation"
          className="fr-breadcrumb fr-mt-4v"
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
          className="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-left fr-icon-arrow-left-line"
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
