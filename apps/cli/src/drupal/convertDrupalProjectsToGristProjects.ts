import { DrupalProjectType } from "./Types";
import { drupalProjectsJson } from "./convertDrupalProjectsToGristProject.spec";
import { GristProjectFields } from '@sde/cli/grist/grist'
import { DrupalProject } from "./fetchDrupalProjects";

export const convertDrupalProjectsToGristProjects = (drupalProjectArray: DrupalProject[]) : GristProjectFields[] => drupalProjectArray.map(convertToGristProject)

export const convertJSONToDrupalProjects = (json: typeof drupalProjectsJson) : DrupalProjectType[] => json.data.map((project)=>project.attributes)

export const convertToGristProject = (drupalProject: DrupalProject) : GristProjectFields => ({
  Titre: drupalProject.attributes.title,
  Sous_titre: drupalProject.attributes.field_teaser_txtps ?? null,
  Programme: null,
  Presentation_du_territoire: drupalProject.attributes.field_description_txtps ?? null,
  Localisation: null,
  Lattitude:  drupalProject.attributes.field_geocoding?.lat ?? null,
  Longitude: drupalProject.attributes.field_geocoding?.lon ?? null,
  Cree_le: new Date(drupalProject.attributes.created).getTime(),
  drupal_id: drupalProject.id,
  drupal_url: drupalProject.links.self.href,
})
