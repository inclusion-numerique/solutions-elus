"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getProjectFilePath } from "@sde/web/project/project";
import { ProjectListItem } from "@sde/web/legacyProject/projectsList";
import { regions, populations, thematiques, ContentType, FilterType } from "../data";
import { ProjectListCta } from "../../projets/ProjectListCta";

type ProjectsProps = {
  filter: FilterType
  slug: ContentType
  projects: ProjectListItem[]
}

export const Projects = ({ filter, slug, projects }: ProjectsProps) => {
  const searchParams = useSearchParams()
  const regionParams = searchParams?.getAll("region") || [""]
  const populationParams = searchParams?.getAll("population") || [""]
  const thematiqueParams = searchParams?.getAll("thematique") || [""]

  const filteredProjects = projects.filter(({ localization, categories }) => {
    const range = populations.find(({ slug }) => slug === populationParams[0])?.range || [0, Number.POSITIVE_INFINITY]
    const region = regions.find(({ slug }) => slug === regionParams[0])?.name || ""
    const thematique = thematiques.find(({ slug }) => slug === thematiqueParams[0])?.name || ""

    if (filter?.slug === "region") {
      if (localization.regionName === slug.name) {
        if (localization.population) {
          if (thematique) {
            return categories.includes(thematique) && localization.population >= range[0] && localization.population <= range[1]
          }
          return localization.population >= range[0] && localization.population <= range[1]
        }
        if (thematique) {
          return categories.includes(thematique)
        }
        return true
      }
      return false
    }

    if (filter?.slug === "population") {
      if (localization.population && slug.range && localization.population >= slug.range[0] && localization.population <= slug.range[1]) {
        if (localization.regionName && region) {
          if (thematique) {
            return categories.includes(thematique) && localization.regionName === region
          }
          return localization.regionName === region
        }
        if (thematique) {
          return categories.includes(thematique)
        }
        return true
      }
      return false
    }

    if (filter?.slug === "thematique") {
      if (categories.includes(slug.name)) {
        if (localization.regionName && region) {
          if (localization.population) {
            return categories.includes(slug.name) && localization.population >= range[0] && localization.population <= range[1] && localization.regionName === region
          }
          return categories.includes(slug.name) && localization.regionName === region
        }
        if (localization.population) {
          return categories.includes(slug.name) && localization.population >= range[0] && localization.population <= range[1]
        }
        return true
      }
      return false
    }

    return false 
  })

  return (
    <div className="fr-container fr-py-20v fr-pt-30v">        
      {filteredProjects.length === 0 ? (
        <>
          <p className="fr-text--lead fr-text--bold">
            Il n&apos;y a pas encore de projets pour votre recherche.
          </p>
          <ul className="fr-raw-list">
            <ProjectListCta />
          </ul>
        </>
      ) : (
        <p className="fr-text--bold fr-text--lg">
          {filteredProjects.length === 1
            ? "1 projet correspond à votre recherche"
            : `${filteredProjects.length} projets correspondent à votre recherche`}
        </p>
      )}
      {filteredProjects.map((project, index) => (
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
                    {project.localization.echelon === 'region' ? (
                      project.localization.label
                    ) : (
                      `${project.localization.label} (${project.localization.department})`
                    )}
                  </p>
                </div>
                <h3 className="fr-card__title">
                  <Link href={`/projets/${project.slug}`}>{project.title}</Link>
                </h3>
                <p className="fr-card__desc">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quisque ac libero viverra, aliquam libero sed, aliquam nisl. Sed euismod, nisl quis tincidunt ultricies, nunc nisl aliquet nunc,
                  quis pharetra mauris diam ut nunc.
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
    </div>
  )
};