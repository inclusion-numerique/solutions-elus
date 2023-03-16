import { DrupalProjectType } from "./Types";
import { drupalProjectsJson } from "./convertDrupalProjectsToGristProject.spec";
import { GristProjectFields } from '@sde/cli/grist/grist'
import { DrupalProject } from "./fetchDrupalProjects";

export const convertDrupalProjectsToGristProjects = (drupalProjectArray: DrupalProject[]) : GristProjectFields[] => drupalProjectArray.map(convertToGristProject)

export const convertJSONToDrupalProjects = (json: typeof drupalProjectsJson) : DrupalProjectType[] => json.data.map((project)=>project.attributes)

export const convertToGristProject = (drupalProject: DrupalProject) : GristProjectFields => ({
  Titre: drupalProject.attributes.title,
  Sous_titre: drupalProject.attributes.field_teaser_txtps ?? null,
  Programme: drupalProject.attributes.field_program_txtps,
  Presentation_du_territoire: drupalProject.attributes.field_description_txtps ?? null,
  Localisation: drupalProject.attributes.field_localization_txtps,
  Lattitude:  drupalProject.attributes.field_geocoding?.lat ?? null,
  Longitude: drupalProject.attributes.field_geocoding?.lon ?? null,
  Cree_le: new Date(drupalProject.attributes.created).getTime() / 1000,
  drupal_id: drupalProject.id,
  drupal_url: `https://agence-cohesion-territoires.gouv.fr${drupalProject.attributes.path.alias}`,
})
