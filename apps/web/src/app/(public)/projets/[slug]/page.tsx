import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { getProject } from '@sde/web/legacyProject/projectsList'
import { prismaClient } from '@sde/web/prismaClient'
import { getProjectFilePath, getProjectPath } from '@sde/web/project/project'
import { PublicWebAppConfig } from '@sde/web/webAppConfig'
import Project from './Project'
import { AnctCard } from './AnctCard'

export const dynamic = 'force-static'

// populate the [slug] dynamic segment
export const generateStaticParams = (): Promise<{ slug: string }[]> =>
  prismaClient.project.findMany({
    select: { slug: true },
  })

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  const program = project.program?.name
  const parentMetadata = await parent
  const previousKeywords = parentMetadata.keywords || []

  return {
    title: project.title,
    description: project.subtitle,
    keywords: [
      ...(program ? [program] : []),
      ...project.categories,
      ...previousKeywords,
    ],
    alternates: {
      canonical: `${PublicWebAppConfig.mainLiveUrl}${getProjectPath(project)}`,
    },
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      url: `${PublicWebAppConfig.mainLiveUrl}${getProjectPath(project)}`,
      siteName: PublicWebAppConfig.projectTitle,
      title: `${project.title} | ${PublicWebAppConfig.projectTitle}`,
      description: project.subtitle,
      tags: [...project.categories, ...program ? [program] : []],
      publishedTime: project.inaugurationDate ? project.inaugurationDate.toISOString() : project.created.toISOString(),
      images: [
        {
          url: `${PublicWebAppConfig.mainLiveUrl}${getProjectFilePath(project.coverImage)}`,
          alt: project.coverImageAlt || project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.subtitle,
      site: "@ANCTerritoires",
      siteId: "2527819680",
      creator: "@ANCTerritoires",
      creatorId: "2527819680",
      images: [
        {
          url: `${PublicWebAppConfig.mainLiveUrl}${getProjectFilePath(project.coverImage)}`,
          alt: project.coverImageAlt || project.title,
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
  const data: Collectivite[] = await res.json()

  const sameName = data.filter(item => item.city.toLowerCase() === localization.label.toLowerCase())
  const target = sameName.find(item => {
    if (item.region === "Corse") return localization.regionName ? item.region === localization.regionName : true
    return localization.department ? item.zip_code.startsWith(localization.department) : true
  })
  const slug = target?.slug_alias || target?.slug

  if (slug) return `https://collectivite.fr/${slug}`;
  return null
};

const ProjectPage = async ({ params }: { params: { slug: string } }) => {
  const project = await getProject(params.slug)
  if (!project) {
    notFound()
  }
  
  const collectiviteUrl = await getCollectiviteUrl(project.localization)

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
      <AnctCard />
    </div>
  )
}

export default ProjectPage
