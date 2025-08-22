'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '@/routes'

import { UserService } from '@/services/user'
import { userStore } from '@/stores/user-store'

import { Header } from '@/components/Header'

import { Listing } from './@components/listing'

const userService = new UserService()

export default function ListUsersPage() {
  const router = useRouter()
  const { user } = userStore()

  useEffect(() => {
    if (user?.role !== 'ADMIN') router.push(ROUTES.PRIVATE.HOME)
  }, [router, user?.role])

  return (
    <div>
      <Header />
      <Listing userService={userService} />
    </div>
  )
}
