import jwt from 'jsonwebtoken'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '@/routes'
import { tokenStore } from '@/stores/token-store'

export function useValidateToken() {
  const router = useRouter()
  const { token, setToken } = tokenStore()
  console.log('token: ', token)

  const verify = useCallback(() => {
    try {
      if (!token) {
        router.push(ROUTES.PUBLIC.LOGIN)
        return
      }

      const decoded = jwt.decode(token) as { exp?: number }
      if (!decoded?.exp || decoded.exp * 1000 < Date.now()) {
        setToken('')
        router.push(ROUTES.PUBLIC.LOGIN)
        return
      }
    } catch (error) {
      console.error('error: ', error)
      router.push(ROUTES.PUBLIC.LOGIN)
    }
  }, [router, setToken, token])

  return {
    verify,
  }
}
