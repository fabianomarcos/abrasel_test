import { useParams } from 'next/navigation'

import { Toast } from '@/components/Toast'
import { IBodyUpdateUser, UserServiceContract } from '@/services/user/contracts'
import { ERRORS } from '@/translator'
import { UpdateFormSchemaType } from '@/schemas/update-form-schema'
import { userStore } from '@/stores/user-store'
import { User } from '@/services/sign-in/contracts'

type UserServiceProps = {
  userService: UserServiceContract
}

export function useUpdateUser({ userService }: UserServiceProps) {
  const { setUser } = userStore()
  const { user_id } = useParams()

  const update = async (body: UpdateFormSchemaType) => {
    const input = Object.entries(body).reduce((acc, [key, value]) => {
      if (!!value) acc[key] = value
      return acc
    }, {} as Record<string, string>) as unknown as IBodyUpdateUser

    const [data, error] = await userService.update(
      input,
      (user_id || input?.id) as string,
    )

    if (error) {
      const errorMessage = error?.message.includes('Some fields are invalids:')
        ? 'Some fields are invalids:'
        : error?.message
      const message = ERRORS(errorMessage)
      Toast({ content: message, options: { type: 'error' } })
      return
    }

    setUser(data?.user as User)

    Toast({
      content: `Olá, ${data?.user.name}, seu usuário foi editado com sucesso!'`,
    })
  }
  return { update }
}
