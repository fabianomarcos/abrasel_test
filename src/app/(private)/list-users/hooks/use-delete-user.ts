import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IUser, UserServiceContract } from '@/services/user/contracts'
import { Toast } from '@/components/Toast'

type UserServicePropsProps = {
  userService: UserServiceContract
  page?: number
  perPage?: number
  userId?: string
}

export type UserListResponse = {
  data: IUser[]
  page: number
  perPage: number
  total: number
}

export function useDeleteUser({ userService }: UserServicePropsProps) {
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: (userId: string) => userService.delete(userId),
    onSuccess: ([, error]) => {
      if (error) {
        Toast({ content: error?.message, options: { type: 'error' } })
        return
      }
      queryClient.invalidateQueries({ queryKey: ['list_users'] })
    },
  })
  return { deleteUser: mutate, isPending, error }
}
