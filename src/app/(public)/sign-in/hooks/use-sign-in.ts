import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '@/routes'
import { tokenStore } from '@/stores/token-store'
import { userStore } from '@/stores/user-store'
import { Toast } from '@/components/Toast'
import { SignInServiceContract } from '@/services/sign-in/contracts'
import { ERRORS } from '@/translator'

type SignInProps = {
  signInService: SignInServiceContract
}

export const useSignIn = ({ signInService }: SignInProps) => {
  const router = useRouter()
  const { setToken } = tokenStore()
  const { setUser } = userStore()

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      if (!email || !password) {
        Toast({
          content: 'Preencha todos os campos',
          options: { type: 'error' },
        })
        return
      }

      const [data, error] = await signInService.signIn({ email, password })

      if (!data || error) {
        const content = ERRORS(error?.message)
        Toast({
          content,
          options: { type: 'error' },
        })
        return
      }

      setToken(data.access_token)
      setUser(data.user)
      router.push(ROUTES.PRIVATE.HOME)
      Toast({
        content: 'Login realizado com sucesso! Seja bem vindo!',
        options: { type: 'success' },
      })
    },
    [router, setToken, setUser, signInService],
  )

  return {
    signIn,
  }
}
