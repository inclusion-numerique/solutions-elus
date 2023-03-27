import { getDataGouvDepartment } from '@sde/cli/departments'
import { prismaClient } from '@sde/web/prismaClient'
import slug from 'slug'
import {
  GristLocalisation,
  GristProgram,
  GristProject,
  GristThematique,
} from './grist.type'

export const convertGristLocalisationToModel = (
  localisations: GristLocalisation[],
): Exclude<
  Parameters<typeof prismaClient.localization.createMany>[number],
  undefined
>['data'] =>
  localisations.map((localisation) => {
    const dataGouvDepartment = localisation.fields.insee_dep
      ? getDataGouvDepartment(localisation.fields.insee_dep)
      : undefined

    return {
      gristId: localisation.id,
      label: localisation.fields.lib_groupement?.trim(),
      insee: localisation.fields.insee_geo?.trim(),
      echelon: localisation.fields.echelon_geo?.trim(),
      department: localisation.fields.insee_dep?.trim(),
      departmentName: dataGouvDepartment?.dep_name,
      region: localisation.fields.insee_reg?.trim(),
      regionName: dataGouvDepartment?.region_name,
      population: localisation.fields.population,
      siren: localisation.fields.siren_groupement.toString(),
      nature: localisation.fields.nature_juridique?.trim(),
      ncc: localisation.fields.NCC?.trim(),
    }
  })

export const convertGristProgramToModel = (programs: GristProgram[]) =>
  programs.map((program) => ({
    gristId: program.id,
    politique: program.fields.politique_publique?.trim(),
    name: program.fields.nom_programme?.trim(),
    territoire: program.fields.territoire,
    description: program.fields.description,
  }))

export const convertGristProjectToModel = (
  projects: GristProject[],
  thematiques: GristThematique[],
  attachments: Record<number, string>,
) =>
  projects.map((project) => ({
    gristId: project.id,
    slug: project.fields.drupal_url
      ? project.fields.drupal_url
          .replace('https://agence-cohesion-territoires.gouv.fr/', '')
          // Remove drupal id at the end of the slug
          .replace(/-(\d+)$/, '')
      : slug(project.fields.Titre?.trim() ?? ''),
    coverImage: project.fields.Visuel
      ? attachments[project.fields.Visuel[1]]
      : '../village.webp',
    title: project.fields.Titre?.trim() ?? '',
    subtitle: project.fields.Sous_titre?.trim() ?? '',
    programId: project.fields.Programme || null,
    localizationId: project.fields.Localisation,
    latitude: project.fields.Lattitude,
    longitude: project.fields.Longitude,
    localizationDescription: project.fields.Presentation_du_territoire,
    categories:
      (project.fields.Thematiques?.filter((thematique, index) => index !== 0)
        .map((thematique) => thematiques.find((x) => x.id === thematique))
        .map((thematique) => thematique?.fields.nom?.trim())
        .filter((x) => x !== undefined) as string[]) || [],
    description: project.fields.Texte?.trim() ?? '',
    goals: project.fields.Objectifs?.trim().split('\n') ?? [],
    characteristics: project.fields.Specificites?.trim().split('\n') ?? [],
    funding: project.fields.Partenaires_et_cofinanceurs?.trim() ?? '',
    budget: project.fields.Budget,
    inaugurationDate: project.fields.Calendrier
      ? new Date(project.fields.Calendrier * 1000)
      : new Date(),
    localActor1Name: project.fields.Acteur_local_1_nom?.trim() ?? '',
    localActor1Text: project.fields.Acteur_local_1_texte?.trim() ?? '',
    localActor1Image: project.fields.Acteur_local_1_image
      ? attachments[project.fields.Acteur_local_1_image[1]]
      : '',
    localActor2Name: project.fields.Acteur_local_2_nom?.trim() ?? '',
    localActor2Text: project.fields.Acteur_local_2_texte?.trim() ?? '',
    localActor2Image: project.fields.Acteur_local_2_image
      ? attachments[project.fields.Acteur_local_2_image[1]]
      : '',
    partner1Name: project.fields.Partenaire_1_nom?.trim() ?? '',
    partner1Text: project.fields.Partenaire_1_texte?.trim() ?? '',
    partner1Image: project.fields.Partenaire_1_image
      ? attachments[project.fields.Partenaire_1_image[1]]
      : '',
    partner2Name: project.fields.Partenaire_2_nom?.trim() ?? '',
    partner2Text: project.fields.Partenaire_2_texte?.trim() ?? '',
    partner2Image: project.fields.Partenaire_2_image
      ? attachments[project.fields.Partenaire_2_image[1]]
      : '',
    createdBy: project.fields.Modifie_par?.trim() ?? '',
    created: project.fields.Cree_le
      ? new Date(project.fields.Cree_le * 1000)
      : new Date(),
  }))
