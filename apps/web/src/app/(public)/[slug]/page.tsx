import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import styles from '@sde/web/app/(public)/PublicLayout.module.css'
import { prismaClient } from '@sde/web/prismaClient'
import { parseArraySearchParam } from '@sde/web/utils/parseArraySearchParam'
import { ProjectsListAside } from '@sde/web/app/(public)/projets/ProjectsListAside'
import { ProjectSearchBar } from '@sde/web/app/(public)/projets/ProjectSearchBar'
import { ProjectPopulationFilter } from '@sde/web/app/(public)/projets/ProjectPopulationFilter'
import { ProjectRegionFilter } from '@sde/web/app/(public)/projets/ProjectRegionFilter'
import ProjectCategoryFilter from '@sde/web/app/(public)/projets/ProjectCategoryFilter'
import { ProjectsList } from '@sde/web/app/(public)/projets/ProjectsList'
import { PublicWebAppConfig } from '@sde/web/webAppConfig'
import { getLanding, getLandingsList } from '@sde/web/legacyProject/landingsList'
import { getProjectCategories } from '@sde/web/legacyProject/categories'
import { populationBrackets } from '@sde/web/anctProjects'
import Link from 'next/link'
import { ProjectRegionMapFilter } from '../projets/ProjectRegionMapFilter'
import { ProjectRegionMapLink } from './ProjectRegionMapLink'

export const dynamic = 'force-static'

// populate the [slug] dynamic segment
export const generateStaticParams = (): Promise<{ slug: string }[]> =>
  prismaClient.landingPageSEO.findMany({
    select: { slug: true },
  })

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const landing = await getLanding(params.slug)

  if (!landing) {
    return notFound()
  }

  const parentMetadata = await parent
  const previousKeywords = parentMetadata.keywords || []

  return {
    title: landing.title,
    description: landing.description,
    keywords: [
      ...previousKeywords,
    ],
    alternates: {
      canonical: `${PublicWebAppConfig.mainLiveUrl}/${landing.slug}`,
    },
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      url: `${PublicWebAppConfig.mainLiveUrl}/${landing.slug}`,
      siteName: PublicWebAppConfig.projectTitle,
      title: `${landing.title} | ${PublicWebAppConfig.projectTitle}`,
      description: landing.description,
      tags: [...previousKeywords],
      publishedTime: new Date().toISOString(),
      images: [
        {
          url: `${PublicWebAppConfig.mainLiveUrl}/images/village.webp`,
          alt: landing.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: landing.title,
      description: landing.description,
      site: "@ANCTerritoires",
      siteId: "2527819680",
      creator: "@ANCTerritoires",
      creatorId: "2527819680",
      images: [
        {
          url: `${PublicWebAppConfig.mainLiveUrl}/images/village.webp`,
          alt: landing.title,
        },
      ],
    },
  }
}

const SEOLandingPage = async ({ params }: { params: { slug: string } }) => {
  const landing = await getLanding(params.slug)
  const projectCategories = await getProjectCategories()

  if (!landing) {
    return notFound()
  }

  return (
    <>
      <div className={`fr-pb-12v ${styles.withImageBackground}`}>
        <div
          className="fr-container fr-py-8v fr-py-md-4v fr-px-0 fr-px-md-8w"
          style={{ position: 'relative' }}
        >
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
                <li style={{ color: 'white' }}>
                  <Link className="fr-breadcrumb__link" href="/">
                    Solutions d&apos;élus
                  </Link>
                </li>
                <li style={{ color: 'white' }}>
                  <a className="fr-breadcrumb__link" aria-current="page" style={{ color: 'white' }}>
                    {landing.title}
                  </a>
                </li>
              </ol>
            </div>
          </nav>
          <div className="fr-grid-row">
            <h1 className="fr-display--xs fr-mb-3v" style={{ color: 'white' }}>
              {landing.title}
            </h1>
            <p className='fr-text--lg' style={{ color: 'white' }}>
              {landing.description}
            </p>
          </div>
        </div>

        <div
          className="fr-container fr-background-default--grey fr-p-0"
          style={{
            position: 'relative',
            boxShadow: '0 0 0 1px var(--border-default-grey)',
          }}
        >
          <div className="fr-grid-row fr-p-0">
            <div className="fr-col-12 fr-col-md-4 fr-p-0 fr-background-alt--grey">
              <aside
                className="fr-p-0"
                style={{
                  boxShadow: 'inset -1px 0 0 0 var(--border-default-grey)',
                }}
                aria-label="Menu latéral"
              >
                <div className="fr-px-2w fr-px-sm-1w fr-px-md-0 fr-hidden fr-unhidden-md">
                  <div className="fr-form-group fr-py-8v">
                    <fieldset className="fr-fieldset">
                      <legend
                        className="fr-fieldset__legend fr-text--regular fr-text--bold fr-text--lg fr-mx-6v"
                        id="checkboxes-legend"
                      >
                        Rechercher par régions
                      </legend>
                      <ProjectRegionMapLink />
                    </fieldset>
                  </div>
                </div>
              </aside>
            </div>
            <div className="fr-col-12 fr-col-md-8">
              <div className="fr-p-4v fr-p-md-8v">
                <div className="fr-hidden fr-unhidden-md fr-px-2w fr-px-md-4w">
                  <p className="fr-text--regular fr-text--bold fr-text--lg fr-mb-2v">
                    Rechercher par population sur le territoire
                  </p>
                  {populationBrackets.map((bracket) => (
                    <Link
                      key={bracket}
                      href={`/projets?population=${bracket}`}
                      className={`fr-tag fr-mt-2v fr-mr-2v `}
                    >
                      {bracket}
                    </Link>
                  ))}
                </div>  
                <ProjectRegionFilter />
                <div className="fr-hidden fr-unhidden-md fr-px-2w fr-px-md-4w fr-mt-8v">
                  <p className="fr-text--regular fr-text--bold fr-text--lg fr-mb-2v">
                    Rechercher par thématiques
                  </p>
                  {projectCategories.map((category) => (
                    <Link
                      key={category}
                      href={`/projets?thematiques=${category}`}
                      className={`fr-tag fr-mt-2v fr-mr-2v `}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fr-container fr-py-12v">
          <p className="fr-text--lg">{landing.text}</p>
        </div>

      </div>
    </>
  )
}

export default SEOLandingPage
