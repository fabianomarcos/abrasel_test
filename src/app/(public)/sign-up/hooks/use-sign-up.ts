import { useRouter } from 'next/navigation'

import { ROUTES } from '@/routes'
import { Toast } from '@/components/Toast'
import {
  IBodySignUp,
  SignUpServiceContract,
} from '@/services/sign-up/contracts'
import { ERRORS, LanguageType } from '@/translator'

type SignUpProps = {
  signUpService: SignUpServiceContract
}

export function useSignUp({ signUpService }: SignUpProps) {
  const router = useRouter()

  const signUp = async ({ email, name, password }: IBodySignUp) => {
    const [data, error] = await signUpService.signUp({ email, name, password })
    console.log('error: ', error)

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
