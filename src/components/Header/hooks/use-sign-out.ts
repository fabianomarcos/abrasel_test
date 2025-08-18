import { useRouter } from 'next/navigation'

import { ROUTES } from '@/routes'
import { tokenStore } from '@/stores/token-store'

export function useSignOut() {
  const router = useRouter()
  const { setToken } = tokenStore()

  const signOut = () => {
    setToken('')
    router.push(ROUTES.PUBLIC.LOGIN)
  }

  return {
    signOut,
  }
}
