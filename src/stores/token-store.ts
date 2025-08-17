import { StorageEnum } from '@/utils/storage-enum'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const tokenStore = create(
  persist<TokenStore>(
    (set) => ({
      token: undefined,
      setToken: (token: string) => set({ token }),
    }),
    {
      name: StorageEnum.token,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

type TokenStore = {
  token: string | undefined
  setToken: (user: string) => void
}
