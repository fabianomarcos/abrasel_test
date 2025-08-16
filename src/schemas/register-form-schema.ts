import { z } from 'zod'

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: 'O nome é obrigatório' })
      .min(2, { error: 'O nome deve conter ao menos duas letras' })
      .max(100, { error: 'O nome deve conter no máximo 100 letras' }),
    password: z
      .string()
      .nonempty({ message: 'A senha é obrigatória' })
      .refine((val) => val.length >= 8, {
        message: 'A senha deve ter pelo menos 8 caracteres',
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: 'Inclua pelo menos uma letra maiúscula',
      })
      .refine((val) => /[a-z]/.test(val), {
        message: 'Inclua pelo menos uma letra minúscula',
      })
      .refine((val) => /[0-9]/.test(val), {
        message: 'Inclua pelo menos um número',
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: 'Inclua pelo menos um caractere especial',
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: 'A confirmação da senha é obrigatória' }),
    email: z.email({ message: 'E-mail inválido' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas devem ser iguais',
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['password'],
    message: 'As senhas devem ser iguais',
  })

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>
