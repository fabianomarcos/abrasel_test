import { useRouter } from 'next/navigation'

import { ROUTES } from '@/routes'
import { Toast } from '@/components/Toast'
import {
  IBodySignUp,
  SignUpServiceContract,
} from '@/services/sign-up/contracts'

type SignUpProps = {
  signUpService: SignUpServiceContract
}

export function useSignUp({ signUpService }: SignUpProps) {
  const router = useRouter()

  const signUp = async (body: IBodySignUp) => {
    console.log('body: ', body)
    const [data, error] = await signUpService.signUp(body)

    if (error) {
      Toast({ content: 'Erro', options: { type: 'error' } })
      return
    }

    Toast({
      content: `Olá, ${data?.user.name}, seu usuário foi criado com sucesso!'`,
    })

    router.push(ROUTES.PUBLIC.LOGIN)
  }
  return { signUp }
}
