'use client'
import Link from 'next/link'
import Image from 'next/image'

import { ROUTES } from '@/routes'
import { userStore } from '@/stores/user-store'
import { Linkedin, User, Users } from '@/components/Icons'
import { MissionVisionAndValues } from '../(mission-vision-values)'

export const MainPage = () => {
  const { user } = userStore()

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <Image
        className="cover"
        src="/abrasel_cover.webp"
        alt="Abrasel logo"
        width={1800}
        height={120}
        priority
      />
      <div className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        <p className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-4">
          Seja bem vindo à Abrasel. Somos a Associação Brasileira de Bares e
          Restaurantes, uma organização de cunho associativo empresarial que tem
          como missão representar e desenvolver o setor de alimentação fora do
          lar (AFL), facilitando o empreender e melhorando a qualidade de vida
          no País.
        </p>
      </div>

      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <Link
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          href={`${ROUTES.PRIVATE.PROFILE}/${user?.id}`}
        >
          <User size={24} />
          Atualizar meu perfil
        </Link>

        {user?.role === 'ADMIN' && (
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors
            flex gap-4 items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent
            font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[200px]"
            href={`${ROUTES.PRIVATE.USERS}`}
          >
            <Users size={22} />
            Listar Usuários
          </Link>
        )}

        <button
          className="rounded-full border border-solid border-black/[.08]
             dark:border-white/[.145] transition-colors flex items-center
             justify-center bg-blue-600 dark:hover:bg-blue-600
             hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12
             px-4 sm:px-5 w-full sm:w-auto md:w-[190px]"
        >
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://www.linkedin.com/company/abrasel/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} />
            Visitar Linkedin
          </a>
        </button>
      </div>

      <MissionVisionAndValues />
    </main>
  )
}
