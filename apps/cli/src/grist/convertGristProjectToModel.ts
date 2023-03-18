import {
  GristLocalisation,
  GristProgram,
  GristProject,
  GristThematique,
} from './grist.type'

export const convertGristLocalisationToModel = (
  localisations: GristLocalisation[],
) =>
  localisations.map((localisation) => ({
    gristId: localisation.id,
    label: localisation.fields.lib_groupement,
    insee: localisation.fields.insee_geo,
    echelon: localisation.fields.echelon_geo,
    department: localisation.fields.insee_dep,
    region: localisation.fields.insee_reg,
    population: localisation.fields.population,
    siren: localisation.fields.siren_groupement.toString(),
    nature: localisation.fields.nature_juridique,
    ncc: localisation.fields.NCC,
  }))

export const convertGristProgramToModel = (programs: GristProgram[]) =>
  programs.map((program) => ({
    gristId: program.id,
    politique: program.fields.politique_publique,
    name: program.fields.nom_programme,
    territoire: program.fields.territoire,
  }))

export const convertGristProjectToModel = (
  projects: GristProject[],
  thematiques: GristThematique[],
  attachments: Record<number, string>,
) =>
  projects.map((project) => ({
    gristId: project.id,
    slug: project.fields.drupal_url
      ? project.fields.drupal_url.replace(
          'https://agence-cohesion-territoires.gouv.fr/',
          '',
        )
      : '',
    coverImage: project.fields.Visuel
      ? attachments[project.fields.Visuel[1]]
      : '',
    title: project.fields.Titre || '',
    subtitle: project.fields.Sous_titre || '',
    programId: project.fields.Programme || null,
    localizationId: project.fields.Localisation,
    latitude: project.fields.Lattitude,
    longitude: project.fields.Longitude,
    localizationDescription: project.fields.Presentation_du_territoire,
    categories:
      (project.fields.Thematiques?.filter((thematique, index) => index !== 0)
        .map((thematique) => thematiques.find((x) => x.id === thematique))
        .map((thematique) => thematique?.fields.nom)
        .filter((x) => x !== undefined) as string[]) || [],
    description: project.fields.Texte || '',
    goals: project.fields.Objectifs || '',
    characteristics: project.fields.Specificites || '',
    funding: project.fields.Partenaires_et_cofinanceurs,
    budget: project.fields.Budget,
    inaugurationDate: project.fields.Calendrier
      ? new Date(project.fields.Calendrier * 1000)
      : new Date(),
    localActor1Name: project.fields.Acteur_local_1_nom,
    localActor1Text: project.fields.Acteur_local_1_texte,
    localActor1Image: project.fields.Acteur_local_1_image
      ? attachments[project.fields.Acteur_local_1_image[1]]
      : '',
    localActor2Name: project.fields.Acteur_local_2_nom,
    localActor2Text: project.fields.Acteur_local_2_texte,
    localActor2Image: project.fields.Acteur_local_2_image
      ? attachments[project.fields.Acteur_local_2_image[1]]
      : '',
    partner1Name: project.fields.Partenaire_1_nom,
    partner1Text: project.fields.Partenaire_1_texte,
    partner1Image: project.fields.Partenaire_1_image
      ? attachments[project.fields.Partenaire_1_image[1]]
      : '',
    partner2Name: project.fields.Partenaire_2_nom,
    partner2Text: project.fields.Partenaire_2_texte,
    partner2Image: project.fields.Partenaire_2_image
      ? attachments[project.fields.Partenaire_2_image[1]]
      : '',
    createdBy: project.fields.Modifie_par,
    created: project.fields.Cree_le
      ? new Date(project.fields.Cree_le * 1000)
      : new Date(),
  }))
