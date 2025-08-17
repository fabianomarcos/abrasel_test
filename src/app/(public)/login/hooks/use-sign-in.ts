import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { ROUTES } from '@/routes'
import { signInService } from '@/services/sign-in'
import { tokenStore } from '@/stores/token-store'
import { userStore } from '@/stores/user-store'

export default function useSignIn() {
  const router = useRouter()
  const { setToken } = tokenStore()
  const { setUser } = userStore()

  const initialValueErros = { email: false, pass: false }
  const [errors, setErrors] = useState(initialValueErros)

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      if (!email || !password) {
        setErrors({ pass: !password, email: !email })
        return
      }

      const [data, error] = await signInService({ email, password })

      if (!data || error) return

      setToken(data.access_token)
      setUser(data.user)
      router.push(ROUTES.PRIVATE.HOME)
    },
    [router, setToken, setUser],
  )

  return {
    signIn,
    errors,
  }
}
