import { GristProject } from "./grist";

export const convertGristProjectToModel = (projects: GristProject[]) => projects.map(project => ({
  gristId: project.id,
  slug: project.fields.drupal_url ? project.fields.drupal_url.replace('https://agence-cohesion-territoires.gouv.fr/', '') : "",
  coverImage: "",
  title: project.fields.Titre || "",
  subtitle: project.fields.Sous_titre || "",
  program: project.fields.Programme,
  localization: project.fields.Localisation || "",
  latitude: project.fields.Lattitude,
  longitude: project.fields.Longitude,
  localizationDescription: project.fields.Presentation_du_territoire,
  categories: [],
  description: project.fields.Texte || "",
  goals: project.fields.Objectifs || "",
  characteristics: project.fields.Specificites || "",
  funding: project.fields.Partenaires_et_cofinanceurs,
  budget: project.fields.Budget,
  inaugurationDate:project.fields.Calendrier ? new Date(project.fields.Calendrier * 1000) : new Date(),
  createdBy: project.fields.Modifie_par,
  created: project.fields.Cree_le ? new Date(project.fields.Cree_le * 1000) : new Date()
}))