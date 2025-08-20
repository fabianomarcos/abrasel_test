import { useCallback } from 'react'

import { ERRORS } from '@/translator'
import { Toast } from '@/components/Toast'
import { ForgotPasswordServiceContract } from '@/services/forgot-password/contracts'
import { ForgotPasswordFormSchemaType } from '@/schemas/forgot-password-form-schema'

type ForgotPasswordProps = {
  forgotPasswordService: ForgotPasswordServiceContract
}

export const useForgotPassword = ({
  forgotPasswordService,
}: ForgotPasswordProps) => {
  const forgotPassword = useCallback(
    async ({ email }: ForgotPasswordFormSchemaType) => {
      if (!email) {
        Toast({
          content: 'Preencha seu email',
          options: { type: 'error' },
        })
        return
      }

      const [data, error] = await forgotPasswordService.forgotPassword({
        email,
      })

      if (!data || error) {
        const content = ERRORS(error?.message)
        Toast({
          content,
          options: { type: 'error' },
        })
        return
      }

      Toast({
        content: 'Login realizado com sucesso! Seja bem vindo!',
        options: { type: 'success' },
      })
    },
    [forgotPasswordService],
  )

  return {
    forgotPassword,
  }
}
