import { useRouter } from 'next/navigation'

import { ROUTES } from '@/routes'
import { Toast } from '@/components/Toast'
import { IBodySignUp, UserServiceContract } from '@/services/user/contracts'
import { ERRORS } from '@/translator'

type SignUpProps = {
  signUpService: UserServiceContract
}

export function useSignUp({ signUpService }: SignUpProps) {
  const router = useRouter()

  const signUp = async ({ email, name, password }: IBodySignUp) => {
    const [data, error] = await signUpService.signUp({ email, name, password })

    if (error) {
      const errorMessage = error?.message.includes('Some fields are invalids:')
        ? 'Some fields are invalids:'
        : error?.message
      const message = ERRORS(errorMessage)
      Toast({ content: message, options: { type: 'error' } })
      return
    }

    Toast({
      content: `Olá, ${data?.user.name}, seu usuário foi criado com sucesso!'`,
    })

    router.push(ROUTES.PUBLIC.LOGIN)
  }
  return { signUp }
}
