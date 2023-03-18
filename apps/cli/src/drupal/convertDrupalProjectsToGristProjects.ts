import { GristProjectFields } from '@sde/cli/grist/grist.type'
import { drupalProjectsJson } from '@sde/cli/drupal/convertDrupalProjectsToGristProject.dumb'
import { DrupalProjectType } from './Types'
import { DrupalProject } from './fetchDrupalProjects'

export const convertJSONToDrupalProjects = (
  json: typeof drupalProjectsJson,
): DrupalProjectType[] => json.data.map((project) => project.attributes)

export const convertToGristProject = (
  drupalProject: DrupalProject,
): GristProjectFields => ({
  Titre: drupalProject.attributes.title,
  Sous_titre: drupalProject.attributes.field_teaser_txtps ?? null,
  Presentation_du_territoire:
    drupalProject.attributes.field_description_txtps ?? null,
  Lattitude: drupalProject.attributes.field_geocoding?.lat ?? null,
  Longitude: drupalProject.attributes.field_geocoding?.lon ?? null,
  Cree_le: new Date(drupalProject.attributes.created).getTime() / 1000,
  drupal_id: drupalProject.id,
  drupal_url: `https://agence-cohesion-territoires.gouv.fr${drupalProject.attributes.path.alias}`,
  Programme: 0,
  Localisation: 0,
  Population: 0,
})

export const convertDrupalProjectsToGristProjects = (
  drupalProjectArray: DrupalProject[],
): GristProjectFields[] => drupalProjectArray.map(convertToGristProject)
