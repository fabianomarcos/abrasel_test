'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useValidateToken } from './hooks/use-validate-token'

import { ROUTES } from '@/routes'
import styles from './header.module.css'
import { userStore } from '@/stores/user-store'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FiArrowDown, FiPower } from 'react-icons/fi'
import { UserOptions } from './UserOptions'
import { useDataHeader } from './hooks/use-data-header'

export const Header = () => {
  const router = useRouter()
  const { verify } = useValidateToken()
  const { user } = userStore()
  const { showOptions, handleToggleUserOptions } = useDataHeader()

  const redirectToHome = () => router.push(ROUTES.PRIVATE.HOME)

  useEffect(() => {
    verify()
  }, [verify])

  return (
    <header
      className="
        flex items-center w-full justify-between
        bg-gradient-to-r from-gray-100 to-gray-900 text-white
        px-4 py-3 relative"
    >
      <div className="text-md font-bold" role="button" onClick={redirectToHome}>
        <Image
          src="/abrasel_logo_removed_bg.webp"
          alt="Abrasel logo"
          width={100}
          height={20}
          priority
          className="rounded-md"
        />
      </div>
      <div
        role="button"
        onClick={() => handleToggleUserOptions(styles.disappear)}
        className="flex gap-4 px-4 py-2 relative bg-gray-700 hover:bg-gray-500
                   rounded-4xl hover:cursor-pointer text-sm"
      >
        <div className="flex gap-4 items-center">
          <FaRegCircleUser size={24} />

          <div className="flex flex-col justify-center ml-4 leading-6">
            <span className="text-gray-200">Bem vindo(a),</span>
            <strong className="text-green-400">{user?.name}</strong>
          </div>

          <FiArrowDown size={24} className="text-gray-100" />
          <FiPower size={28} className="text-gray-100" />
        </div>
      </div>

      {showOptions && (
        <div
          className={`absolute top-20 right-8 z-10 ${styles.list}`}
          data-id="animation"
        >
          <UserOptions />
        </div>
      )}
    </header>
  )
}
