import z from 'zod'

export const objectFormValidation = z.object({
  name: z.string(),
})

export type ObjectFormData = z.infer<typeof objectFormValidation>
