import z from 'zod'

export const gristRecordsResponse = z.object({
  records: z.array(
    z.object({
      id: z.number(),
      fields: z.object({}).passthrough(),
    }),
  ),
})

// TODO Type this
// e.g. Visuel: [ 'L', 6 ],
const gristRelationshipValidation = z.tuple([z.string()]).rest(z.number())

const emptyStringToNull = <T>(value: T) =>
  typeof value === 'string' && value.trim() === '' ? null : value
const gristNullableString = z
  .preprocess(emptyStringToNull, z.string().nullable())
  .optional()

export const gristProjectFieldsValidation = z.object({
  drupal_id: gristNullableString,
  drupal_url: gristNullableString,
  Programme: z.number(),
  Localisation: z.number(),
  Titre: gristNullableString,
  Sous_titre: gristNullableString,
  // TODO Type this
  // e.g. Visuel: [ 'L', 6 ],
  Visuel: gristRelationshipValidation.nullable().optional(),
  // TODO Type this
  // e.g. [ 'L', 2, 6, 3, 1, 8 ]
  Thematiques: gristRelationshipValidation.nullable().optional(),
  Specificites: gristNullableString,
  Objectifs: gristNullableString,
  Texte: gristNullableString,
  Budget: z.number().int().nullable().optional(),
  // TODO Type this
  // e.g. Acteur_local_1_image: [ 'L', 4 ],
  Acteur_local_1_image: gristRelationshipValidation.nullable().optional(),
  Calendrier: z.number().int().nullable().optional(),
  Partenaires_et_cofinanceurs: gristNullableString,
  Modifie_par: gristNullableString,
  Presentation_du_territoire: gristNullableString,
  Acteur_local_1_texte: gristNullableString,
  Acteur_local_1_nom: gristNullableString,
  Acteur_local_2_texte: gristNullableString,
  Acteur_local_2_nom: gristNullableString,
  // TODO Type this
  // e.g. Acteur_local_1_image: [ 'L', 4 ],
  Acteur_local_2_image: gristRelationshipValidation.nullable().optional(),
  Le: z.number().nullable().optional(),
  Cree_le: z.number().nullable(),
  // TODO Type this
  // e.g. Acteur_local_1_image: [ 'L', 4 ],
  Partenaire_1_image: gristRelationshipValidation.nullable().optional(),
  Partenaire_1_nom: gristNullableString,
  Partenaire_1_texte: gristNullableString,
  Type_de_collectivite: z
    .preprocess(
      emptyStringToNull,
      z.enum(['commune', 'departement', 'epci', 'region']).nullable(),
    )
    .optional(),
  Departement: gristNullableString,
  Partenaire_2_nom: gristNullableString,
  Partenaire_2_texte: gristNullableString,
  // TODO Type this
  // e.g. Acteur_local_1_image: [ 'L', 4 ],
  Partenaire_2_image: gristRelationshipValidation.nullable().optional(),
  Population: z.number().nullable(),
  Region: gristNullableString,
  Lattitude: z.number().nullable(),
  Longitude: z.number().nullable(),
})

const gristLocalisationFieldsValidation = z.object({
  siren_groupement: z.number(),
  lib_groupement: z.string(),
  nature_juridique: z.string(),
  insee_geo: z.string(),
  echelon_geo: z.string(),
  insee_dep: gristNullableString,
  insee_reg: gristNullableString,
  NCC: z.string(),
  population: z.number().nullable(),
})

const gristProgramFieldsValidation = z.object({
  nom_programme: z.string(),
  politique_publique: z.string(),
  territoire: z.array(z.string()),
  description: z.string(),
})

export const gristProjectValidation = z.object({
  id: z.number().int(),
  fields: gristProjectFieldsValidation,
})

export const grisLocalisationValidation = z.object({
  id: z.number().int(),
  fields: gristLocalisationFieldsValidation,
})

export const grisProgramValidation = z.object({
  id: z.number().int(),
  fields: gristProgramFieldsValidation,
})

export const grisThematiqueValidation = z.object({
  id: z.number().int(),
  fields: z.object({
    nom: z.string(),
  }),
})

export type GristProjectFields = z.infer<typeof gristProjectFieldsValidation>

export type GristProject = z.infer<typeof gristProjectValidation>

export type GristLocalisation = z.infer<typeof grisLocalisationValidation>

export type GristProgram = z.infer<typeof grisProgramValidation>

export type GristThematique = z.infer<typeof grisThematiqueValidation>
