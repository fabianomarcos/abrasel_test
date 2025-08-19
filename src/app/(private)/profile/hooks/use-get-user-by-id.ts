'use client'
import { useParams } from 'next/navigation'
import { IUser, UserServiceContract } from '@/services/user/contracts'
import { useCallback, useEffect, useState } from 'react'
import { IError } from '@/backend/interfaces'

type UserServicePropsProps = {
  userService: UserServiceContract
}

export function useGetUserById({ userService }: UserServicePropsProps) {
  const { user_id } = useParams()
  const [isPending, setIsPending] = useState(true)
  const [user, setUser] = useState({} as IUser)
  const [error, setError] = useState({} as IError)
  const listUser = useCallback(async () => {
    const [data, error] = await userService.listById(user_id as string)
    if (data) setUser(data.user)
    if (error) setError(error)
    setIsPending(false)
  }, [userService, user_id])

  useEffect(() => {
    listUser()
  }, [listUser])

  return { error, isPending, user }
}
