import { getMeService } from '@/services/sign-in'
import { User } from '@/services/sign-in/contracts'
import { StorageEnum } from '@/utils/storage-enum'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const userStore = create(
  persist<UserStore>(
    (set, get) => ({
      user: undefined,
      setUser: (user: User) => {
        set({ user })
      },
      sync: async () => {
        const [data] = await getMeService('')
        const user = get().user

        if (!data || !user) return

        set({ user })
      },
    }),
    {
      name: StorageEnum.user,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

type UserStore = {
  user: User | undefined
  setUser: (user: User) => void
  sync: () => Promise<void>
}
