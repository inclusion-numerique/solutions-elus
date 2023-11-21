import z, { string } from 'zod'

export const GetLeadFormDataValidation = z.object({
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
  email: z
    .string({
      required_error: 'Veuillez renseigner une adresse email',
    })
    .email('Veuillez renseigner une adresse email valide'),
  phone: z
    .string({
      required_error: 'Veuillez renseigner un numéro de téléphone',
    })
    .optional(),
  consent: z
    .boolean({
      required_error: 'Veuillez accepter d’être recontacté',
    }),
  reference: z.string(),
})

export type GetLeadData = z.infer<typeof GetLeadFormDataValidation>
