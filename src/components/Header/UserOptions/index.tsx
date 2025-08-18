'use client'
import { useRouter } from 'next/navigation'

import { ROUTES } from '@/routes'
import { userStore } from '@/stores/user-store'
import { LogOut, User } from '@/components/Icons'
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
      className="flex align-center items-start gap-6 cursor-pointer w-full hover:opacity-50"
      {...rest}
    >
      {children}
    </li>
  )
  return (
    <ul
      className="w-64 bg-gray-400 p-5 list-none rounded-xl gap-5 text-lg
      flex flex-col"
    >
      <Li onClick={redirectToProfile}>
        <User size={24} />
        <span>Meu perfil</span>
      </Li>

      {isAdim && (
        <Li onClick={redirectToListUsers}>
          <User size={24} />
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
