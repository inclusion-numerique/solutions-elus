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
export const generateStaticParams = (): Promise<{ slug: string }[]> =>
  prismaClient.project.findMany({
    select: { slug: true },
  })

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = await getProject(params.slug)
  if (!project) {
    notFound()
    return {}
  }
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
}

type Collectivite = {
  city: string;
  zip_code: string;
  slug: string;
  slug_alias: string;
  region: string;
}

type Localization = {
  label: string;
  department: string | null;
  departmentName: string | null;
  regionName: string | null;
  population: number | null;
  echelon: string;
}

const getCollectiviteUrl = async (localization: Localization) => {
  const res = await fetch(`https://api.collectivite.fr/api/commune/search/${encodeURIComponent(localization.label)}`)
  const data = await res.json()

  const sameName = data.filter((item: Collectivite) => item.city.toLowerCase() === localization.label.toLowerCase())
  const target = sameName.find((item: Collectivite) => 
    item.zip_code ? item.zip_code.startsWith(localization.department || '') : true
  )
  const slug = target.slug_alias || target.slug || ""

  return `https://collectivite.fr/${slug}`;
};

const ProjectPage = async ({ params }: { params: { slug: string } }) => {
  const project = await getProject(params.slug)
  if (!project) {
    return notFound()
  }
  
  const collectiviteUrl = project.localization.echelon === 'commune' ?
    await getCollectiviteUrl(project.localization) : ""

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
                Solutions d&apos;élus
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
      <Project project={project} collectiviteUrl={collectiviteUrl} />
    </div>
  )
}

export default ProjectPage
