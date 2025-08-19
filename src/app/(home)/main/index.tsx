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
    <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
      <Image
        className="cover"
        src="/abrasel_cover.webp"
        alt="Abrasel logo"
        width={1800}
        height={120}
        priority
      />
      <div className="list-inside list-decimal text-center font-mono text-sm/6 sm:text-left">
        <p className="bg-gradient-to-r from-gray-900 to-gray-700 p-4 text-white">
          Seja bem vindo à Abrasel. Somos a Associação Brasileira de Bares e
          Restaurantes, uma organização de cunho associativo empresarial que tem
          como missão representar e desenvolver o setor de alimentação fora do
          lar (AFL), facilitando o empreender e melhorando a qualidade de vida
          no País.
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
        <Link
          className="bg-foreground text-background flex h-10 w-full items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
          href={`${ROUTES.PRIVATE.PROFILE}/${user?.id}`}
        >
          <User size={24} />
          Atualizar meu perfil
        </Link>

        {user?.role === 'ADMIN' && (
          <Link
            className="flex h-10 w-full items-center justify-center gap-4 rounded-full border border-solid border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:w-auto sm:px-5 sm:text-base md:w-[200px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href={`${ROUTES.PRIVATE.USERS}`}
          >
            <Users size={22} />
            Listar Usuários
          </Link>
        )}

        <button className="flex h-10 w-full items-center justify-center rounded-full border border-solid border-black/[.08] bg-blue-600 px-4 text-sm font-medium transition-colors hover:border-transparent sm:h-12 sm:w-auto sm:px-5 sm:text-base md:w-[190px] dark:border-white/[.145] dark:hover:bg-blue-600">
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
