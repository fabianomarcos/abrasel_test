'use client'
import { useRouter } from 'next/navigation'

import { ROUTES } from '@/routes'
import { userStore } from '@/stores/user-store'
import { LogOut, User, Users } from '@/components/Icons'
import { useSignOut } from '../hooks/use-sign-out'

interface LiProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
}

export function UserOptions() {
  const router = useRouter()
  const { signOut } = useSignOut()
  const { user } = userStore()
  const isAdim = user?.role === 'ADMIN'

  const redirectToProfile = () =>
    router.push(`${ROUTES.PRIVATE.PROFILE}/${user?.id}`)

  const redirectToListUsers = () => router.push(`${ROUTES.PRIVATE.USERS}`)

  const Li = ({ children, ...rest }: LiProps) => (
    <li
      role="button"
      className="align-center flex w-full cursor-pointer items-start gap-6 hover:opacity-50"
      {...rest}
    >
      {children}
    </li>
  )
  return (
    <ul className="flex w-64 list-none flex-col gap-5 rounded-xl bg-gray-400 p-5 text-lg">
      <Li onClick={redirectToProfile}>
        <User size={24} />
        <span>Meu perfil</span>
      </Li>

      {isAdim && (
        <Li onClick={redirectToListUsers}>
          <Users size={24} />
          <span>Usuários</span>
        </Li>
      )}

      <Li onClick={signOut}>
        <LogOut size={24} />
        <span>Sair</span>
      </Li>
    </ul>
  )
}
