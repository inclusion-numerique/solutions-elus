"use client"

import { useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getProjectFilePath } from "@sde/web/project/project";
import { ProjectListItem } from "@sde/web/legacyProject/projectsList";
import { regions, populations, thematiques, ContentType, FilterType } from "../data";
import { ProjectListCta } from "../../projets/ProjectListCta";

type ProjectsProps = {
  filter?: FilterType
  slug?: ContentType
  projects: ProjectListItem[]
  pageSize?: number
}

export const Projects = ({ filter, slug, projects, pageSize = 10 }: ProjectsProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const regionParams = searchParams?.getAll("region") || [""]
  const populationParams = searchParams?.getAll("population") || [""]
  const thematiqueParams = searchParams?.getAll("thematique") || [""]

  // eslint-disable-next-line arrow-body-style
  const filteredProjects = useMemo(() => projects.filter(({ localization, categories }) => {
    // const range = populations.find(({ slug }) => slug === populationParams[0])?.range || [0, Number.POSITIVE_INFINITY]
    // const region = regions.find(({ slug }) => slug === regionParams[0])?.name || ""
    // const thematique = thematiques.find(({ slug }) => slug === thematiqueParams[0])?.name || ""

    // if (!filter && !slug) {
    //   return true
    // }

    // if (filter?.slug === "region" && slug) {
    //   if (localization.regionName === slug.name) {
    //     if (localization.population) {
    //       if (thematique) {
    //         return categories.includes(thematique) && localization.population >= range[0] && localization.population <= range[1]
    //       }
    //       return localization.population >= range[0] && localization.population <= range[1]
    //     }
    //     if (thematique) {
    //       return categories.includes(thematique)
    //     }
    //     return true
    //   }
    //   return false
    // }

    // if (filter?.slug === "population" && slug) {
    //   if (localization.population && slug.range && localization.population >= slug.range[0] && localization.population <= slug.range[1]) {
    //     if (localization.regionName && region) {
    //       if (thematique) {
    //         return categories.includes(thematique) && localization.regionName === region
    //       }
    //       return localization.regionName === region
    //     }
    //     if (thematique) {
    //       return categories.includes(thematique)
    //     }
    //     return true
    //   }
    //   return false
    // }

    // if (filter?.slug === "thematique" && slug) {
    //   if (categories.includes(slug.name)) {
    //     if (localization.regionName && region) {
    //       if (localization.population) {
    //         return categories.includes(slug.name) && localization.population >= range[0] && localization.population <= range[1] && localization.regionName === region
    //       }
    //       return categories.includes(slug.name) && localization.regionName === region
    //     }
    //     if (localization.population) {
    //       return categories.includes(slug.name) && localization.population >= range[0] && localization.population <= range[1]
    //     }
    //     return true
    //   }
    //   return false
    // }

    return true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [filter, slug])
  
  const total = filteredProjects.length
  const pageCount = Math.ceil(total / pageSize)

  const pageParams = Number(searchParams?.get("page")) || 1
  const page = pageParams > pageCount ? pageCount : pageParams

  useEffect(() => {
    if (pageParams < 1) {
      const params = new URLSearchParams(searchParams?.toString())
      params.delete("page")
      router.push(`${pathname}?${params.toString()}`)
    }
    if (pageParams > 1 && pageParams > pageCount) {
      const params = new URLSearchParams(searchParams?.toString())
      const lastPage = pageCount > 0 ? pageCount : 1
      lastPage === 1 ? params.delete("page") : params.set("page", lastPage.toString())
      router.push(`${pathname}?${params.toString()}`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [pageParams])

  const paginatedProjects = useMemo(() => (
    filteredProjects.slice((page - 1) * pageSize, page * pageSize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [filteredProjects, page])

  const handlePageChange = (newPage?: number) => {
    const params = new URLSearchParams(searchParams?.toString())
    newPage ? params.set("page", newPage.toString()) : params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }

  if (total === 0 || pageCount === 0) {
    return (
      <div className="fr-container fr-py-20v fr-pt-30v">        
        <p className="fr-text--lead fr-text--bold">
          Il n&apos;y a pas encore de projets pour votre recherche.
        </p>
        <ul className="fr-raw-list">
          <ProjectListCta />
        </ul>
      </div>
    )
  }

  return (
    <div className="fr-container fr-py-20v fr-pt-30v">
      <p className="fr-text--bold fr-text--lg">
        {total === 1
          ? "1 projet correspond à votre recherche"
          : `${total} projets correspondent à votre recherche`}
      </p>
      {total > 0 && paginatedProjects.map((project, index) => (
        <div key={project.slug} className={`fr-pb-${index === (projects.length - 1) ? 0 : 5}v`}>
          <div className="fr-card fr-enlarge-link fr-card--horizontal fr-card--horizontal-half">
            <div className="fr-card__header">
              <div className="fr-card__img">
                <picture
                  className="fr-responsive-img"
                  style={{ flexGrow: 0, flexShrink: 0, height: "160px" }}
                >
                  <source srcSet={getProjectFilePath(project.coverImage)} type="image/webp" />
                  <img
                    id={`${project.id}__image`}
                    src={getProjectFilePath(project.coverImage)}
                    alt={project.coverImageAlt ?? `Photo illustrant le projet "${project.title}"`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </picture>
              </div>
            </div>
            <div className="fr-card__body">
              <div className="fr-card__content">
                <div className="fr-card__start fr-mb-6v">
                  <p className="fr-hint-text fr-mb-0" style={{ color: 'var(--text-mention-grey' }}>
                    <span className="fr-mr-1w fr-icon--sm fr-icon-map-pin-2-line" />
                    {project.localization.echelon === 'region'
                      ? (project.localization.label )
                      : (`${project.localization.label} (${project.localization.department})`)
                    }
                  </p>
                </div>
                <h3 className="fr-card__title">
                  <Link href={`/projets/${project.slug}`}>{project.title}</Link>
                </h3>
                <p className="fr-card__desc">
                  {
                    (project.subtitle.length > 80 && project.subtitle)
                    || (project.description.length > 240
                      ? `${project.description.slice(0, 240)}...`
                      : project.description)
                  }
                </p>
                <div className="fr-card__end">
                  <ul className="fr-tags-group">
                    {project.categories.map((category) => (
                      <li key={category}>
                        <p className="fr-tag">{category}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {pageCount > 1 && (
        <div className="fr-grid-row fr-grid-row--center">
          <nav role="navigation" className="fr-pagination fr-mt-10v" aria-label="pagination">
            <ul className="fr-pagination__list">
              <li>
                <button
                  className="fr-pagination__link fr-pagination__link--first"
                  aria-disabled={page === 1}
                  disabled={page === 1}
                  role="link"
                  onClick={() => handlePageChange()}
                >
                  Première page
                </button>
              </li>
              <li>
                <button
                  className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
                  aria-disabled={page === 1}
                  disabled={page === 1}
                  role="link"
                  onClick={() => handlePageChange(page - 1 === 1 ? undefined : page - 1)}
                >
                  Page précédente
                </button>
              </li>
              {Array.from({length: pageCount}).map((_, index) => {
                const current = index + 1
                if (
                  current > 2
                  && current < pageCount - 1
                  && Math.abs(current - page) > 2
                  // && Math.abs(current - page) < pageCount - 2
                ) {
                  if (page - 3 === current || page + 3 === current) return (
                    <li key={`page-${current}`}>
                      <button
                        className="fr-pagination__link"
                        aria-hidden="true"
                        role="link"
                        aria-disabled
                        disabled
                      >
                        …
                      </button>
                    </li>
                  )
                  return null
                }
                return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={`page-${current}`}>
                  <button
                    className="fr-pagination__link"
                    aria-current={current === page ? 'page' : undefined}
                    title={`Page ${current}`}
                    role="link"
                    onClick={() => handlePageChange(current === 1 ? undefined : current)}
                  >
                    {current}
                  </button>
                </li>
              )})}
              <li>
                <button
                  className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
                  aria-disabled={page === pageCount}
                  disabled={page === pageCount}
                  role="link"
                  onClick={() => handlePageChange(page + 1)}
                >
                  Page suivante
                </button>
              </li>
              <li>
                <button
                  className="fr-pagination__link fr-pagination__link--last"
                  aria-disabled={page === pageCount}
                  disabled={page === pageCount}
                  role="link"
                  onClick={() => handlePageChange(pageCount)}
                >
                  Dernière page
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
};