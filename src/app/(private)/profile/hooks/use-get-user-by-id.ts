import { useQuery } from '@tanstack/react-query'
import { UserServiceContract } from '@/services/user/contracts'
import { useParams } from 'next/navigation'

type UserServicePropsProps = {
  userService: UserServiceContract
}

export function useGetUserById({ userService }: UserServicePropsProps) {
  const { user_id } = useParams()
  const listUser = () => {
    return userService.listById(user_id as string)
  }

  const { isPending, data } = useQuery({
    queryKey: [`list_user/${user_id}`],
    queryFn: listUser,
  })

  const [user, error] = data || [null, null]

  return { error, isPending, user }
}
