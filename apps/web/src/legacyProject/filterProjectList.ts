import { ProjectListItem } from '@sde/web/legacyProject/projectsList'
import {
  Category,
  District,
  PopulationBracket,
  populationBracketsConditions,
} from '@sde/web/anctProjects'
import { populationIsInBracket } from '@sde/web/project/population'

export const filterProjects = ({
  projects,
  districts,
  categories,
  populationBrackets,
}: {
  projects: ProjectListItem[]
  districts: Set<District>
  categories: Set<Category>
  populationBrackets: Set<PopulationBracket>
}) =>
  projects.filter(
    (project) =>
      // No districts filter
      (districts.size === 0 ||
        // Or project district is selected
        districts.has(project.localization.regionName as District)) &&
      // And
      // No categories filter
      (categories.size === 0 ||
        // Or one of project categories is selected
        project.categories.some((category) =>
          categories.has(category as Category),
        )) &&
      // And
      // No population filter
      (populationBrackets.size === 0 ||
        // Or population is not known
        !project.localization.population ||
        // Or Project population is in one of the brackets
        [...populationBrackets].some((bracket) =>
          populationIsInBracket(
            project.localization.population ?? 0,
            populationBracketsConditions[bracket],
          ),
        )),
  )
