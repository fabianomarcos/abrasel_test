import { useQuery } from '@tanstack/react-query'
import { IUser, UserServiceContract } from '@/services/user/contracts'

type UserServicePropsProps = {
  userService: UserServiceContract
  page: number
  perPage: number
}

export type UserListResponse = {
  data: IUser[]
  page: number
  perPage: number
  total: number
}

export function useGetUsers({
  userService,
  page,
  perPage,
}: UserServicePropsProps) {
  const listUsers = () => {
    return userService.list({ page, perPage })
  }

  const { isPending, data } = useQuery({
    queryKey: [`list_users`],
    queryFn: listUsers,
  })

  const [users, error] = data || [
    {
      users: { data: [], page: 1, perPage: 10, total: 1 } as UserListResponse,
    },
    null,
  ]

  return { error, isPending, users: users?.users }
}
