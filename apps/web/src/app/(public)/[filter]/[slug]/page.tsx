import Link from 'next/link'
import { notFound } from 'next/navigation'
import styles from '@sde/web/app/(public)/PublicLayout.module.css'
import { getProjectsList } from '@sde/web/legacyProject/projectsList'
import { ShareSearchCTA } from '../../ShareSearchCTA'
import { Paragraph } from '../../Paragraph'
import { Form } from './Form'
import { Projects } from './Projects'
import { filters } from '../data'

// ------------------------------------------------------------

export const dynamic = 'force-static'

type StaticParams = {
  filter: string
  slug: string
}

// populate the [filter] and [slug] dynamic segments
export const generateStaticParams = (): StaticParams[] => (
  filters.flatMap(({ slug: filter }) => (
    filters.find(({ slug }) => slug === filter)?.content.map(({ slug }) => ({ filter, slug })) ?? []
  ))
)

const FilterSlugPage = async ({ params }: { params: StaticParams }) => {
  const filter = filters.find(({ slug }) => slug === params.filter)
  const slug = filter?.content.find(({ slug }) => slug === params.slug)

  if (!filter || !slug) {
    return notFound()
  }

  // const projects = await getProjectsList()

  return (
    <>
      <div className={`${styles.withImageBackground}`}>
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
                  <Link className="fr-breadcrumb__link" href="/projets">
                    Voir les projets
                  </Link>
                </li>
                <li style={{ color: 'white' }}>
                  <Link className="fr-breadcrumb__link" href={`/${filter.slug}`}>
                    {filter.name}
                  </Link>
                </li>
                <li style={{ color: 'white' }}>
                  <a className="fr-breadcrumb__link" aria-current="page" style={{ color: 'white' }}>
                    {slug.name}
                  </a>
                </li>
              </ol>
            </div>
          </nav>
          <div className="fr-grid-row">
            <h1
              className="fr-display--xs fr-mb-3v"
              style={{ color: 'white' }}
            >
              {filter.name}&nbsp;
              {filter.slug === 'region' && slug.name}
              {filter.slug === 'population' && `de ${slug.name.replace(/(De)/g, '').toLowerCase()}`}
              {filter.slug === 'thematique' && `"${slug.name}"`}
            </h1>
            <p className='fr-text--lg' style={{ color: 'white' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Purus sit amet volutpat consequat mauris nunc congue.
            </p>
          </div>
        </div>

        <Form filter={filter} slug={slug} />

      </div>
      {/* <Projects filter={filter} slug={slug} projects={projects} /> */}
      <ShareSearchCTA />
      <div className="fr-container">
        <Paragraph />
      </div>
    </>
  )
}

export default FilterSlugPage
