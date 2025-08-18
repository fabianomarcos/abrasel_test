import { z } from 'zod'

export const addressFormSchema = z.object({
  zip_code: z
    .string()
    .nonempty({ message: 'O CEP é obrigatório' })
    .min(9, { error: 'O CEP deve conter 9 caracteres' })
    .max(9, { error: 'O CEP deve conter 9 caracteres' }),
  neighborhood: z.string().nonempty({ message: 'O bairro é obrigatória' }),
  city: z.string().nonempty({ message: 'A cidade é obrigatória' }),
  state: z.string().nonempty({ message: 'O estado é obrigatório' }),
  street: z.string().nonempty({ message: 'A rua é obrigatória' }),
  number: z.string().nonempty({ message: 'O número é obrigatório' }),
})

export type AddressFormSchemaType = z.infer<typeof addressFormSchema>
