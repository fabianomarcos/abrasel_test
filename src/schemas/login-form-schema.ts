import { z } from 'zod'

export const loginFormSchema = z.object({
  password: z.string().nonempty({ message: 'A senha é obrigatória' }),
  email: z.email({ message: 'Email inválido' }),
})

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>
