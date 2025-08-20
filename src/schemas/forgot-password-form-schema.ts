import { z } from 'zod'

export const forgotPasswordFormSchema = z.object({
  email: z.email({ message: 'E-mail inválido' }),
})

export type ForgotPasswordFormSchemaType = z.infer<
  typeof forgotPasswordFormSchema
>
