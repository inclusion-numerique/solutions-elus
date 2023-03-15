import z, { string } from 'zod'
import { Options } from '@sde/web/utils/options'

export const ShareProjectFormDataValidation = z.object({
  community: z.object(
    {
      id: z.string(),
      name: z.string(),
      text: z.string(),
      scale: z.string(),
      zipcodes: z.array(string()).nullable(),
    },
    {
      required_error: 'Veuillez renseigner la collectivité.',
      invalid_type_error: 'Veuillez renseigner la collectivité.',
    },
  ),
  name: z.string({
    required_error: 'Veuillez renseigner le nom et prénom',
  }),
  quality: z.string({
    required_error: 'Veuillez renseigner la qualité',
  }),
  email: z
    .string({
      required_error: 'Veuillez renseigner un email',
    })
    .email('Veuillez renseigner un email valide'),
  phone: z
    .string({
      required_error: 'Veuillez renseigner un numéro de téléphone',
    })
    .optional(),
  domain: z.string({
    required_error: 'Veuillez renseigner le domaine de votre projet',
  }),
  solution: z
    .string({
      required_error: 'Veuillez renseigner le nom de la solution',
    })
    .max(100, 'Veuillez entrer 100 caractères maximum'),
  description: z
    .string({
      required_error: 'Veuillez décrire votre solution',
    })
    .max(2000, 'Veuillez entrer 2000 caractères maximum'),
  dates: z
    .string({
      required_error: 'Veuillez renseigner les dates clefs de votre projet',
    })
    .max(500, 'Veuillez entrer 500 caractères maximum'),
  partners: z
    .string({
      required_error: 'Veuillez renseigner les partenaires de votre projet',
    })
    .max(500, 'Veuillez entrer 500 caractères maximum'),
  tech: z
    .string({
      required_error: 'Veuillez décrire les aspects techniques de votre projet',
    })
    .max(1000, 'Veuillez entrer 1000 caractères maximum'),
  reference: z.string(),
  // Array of storage keys
  attachments: z.array(
    z.object({ key: z.string(), type: z.string(), name: z.string() }),
  ),
})

export type ShareProjectData = z.infer<typeof ShareProjectFormDataValidation>

const projectDomains = [
  'Accès au numérique',
  'Services au public',
  'Transport et mobilités',
  'Transition écologique',
  'Logement et cadre de vie',
  'Développement économique',
  'Infrastructures locales',
  'Solidarité',
  'Éducation et jeunesse',
  'Attractivité et dynamisme territorial',
]

// Labels and values are the same
export const domainOptions: Options = projectDomains.map((domain) => ({
  name: domain,
  value: domain,
}))
