import { z } from 'zod'

export const updateFormSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: 'O nome é obrigatório' })
      .min(2, { error: 'O nome deve conter ao menos duas letras' })
      .max(100, { error: 'O nome deve conter no máximo 100 letras' }),

    current_password: z.string().optional(),

    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: 'A senha deve ter pelo menos 8 caracteres',
      })
      .refine((val) => !val || /[A-Z]/.test(val), {
        message: 'Inclua pelo menos uma letra maiúscula',
      })
      .refine((val) => !val || /[a-z]/.test(val), {
        message: 'Inclua pelo menos uma letra minúscula',
      })
      .refine((val) => !val || /[0-9]/.test(val), {
        message: 'Inclua pelo menos um número',
      })
      .refine((val) => !val || /[^A-Za-z0-9]/.test(val), {
        message: 'Inclua pelo menos um caractere especial',
      }),

    email: z.email({ message: 'E-mail inválido' }),
  })
  .refine(
    (data) =>
      (!data.password && !data.current_password) ||
      (data.password && data.current_password),
    {
      message: 'Senha atual e nova senha são obrigatórias juntas',
      path: ['password'],
    },
  )

export type UpdateFormSchemaType = z.infer<typeof updateFormSchema>
