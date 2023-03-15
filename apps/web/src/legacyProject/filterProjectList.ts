import { District } from '@sde/web/projethoteque/legacyProjects'
import { ProjectListItem } from '@sde/web/legacyProject/projectsList'
import { Category } from '@sde/web/anctProjects'

export const filterProjects = ({
  projects,
  districts,
  categories,
}: {
  projects: ProjectListItem[]
  districts: Set<District>
  categories: Set<Category>
}) =>
  projects.filter(
    (project) =>
      // No districts filter
      (districts.size === 0 ||
        // Or project district is selected
        districts.has(project.district as District)) &&
      // And
      // No categories filter
      (categories.size === 0 ||
        // Or one of project categories is selected
        project.categories.some((category) =>
          categories.has(category as Category),
        )),
  )
