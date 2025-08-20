'use client'
import Link from 'next/link'

import { ROUTES } from '@/routes'
import { forgotPasswordFormSchema } from '@/schemas/forgot-password-form-schema'
import { useValidateSchema } from '@/hooks/use-schema-validator'

import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Loader } from '@/components/Loader'
import { useForgotPassword } from './hooks/use-forgot-password-in'
import { ForgotPasswordService } from '@/services/forgot-password'

const forgotPasswordService = new ForgotPasswordService()

export default function LoginPage() {
  const { register, errors, handleSubmit, isSubmitting } = useValidateSchema(
    forgotPasswordFormSchema,
  )

  const { forgotPassword } = useForgotPassword({ forgotPasswordService })

  return (
    <div className="flex overflow-hidden bg-[url('/login_background.webp')] bg-cover bg-center">
      <div className="flex h-full w-full items-center justify-center bg-gray-100 bg-gradient-to-br opacity-40" />
      <div className="bg-gray-700 opacity-80 sm:bg-gray-700 lg:bg-transparent lg:opacity-100">
        <div className="flex h-screen w-[310px] items-center justify-center sm:w-[330px]">
          {isSubmitting && <Loader />}
          <form
            className="flex h-full w-full flex-col justify-center gap-4 p-8"
            onSubmit={handleSubmit(forgotPassword)}
          >
            <h1 className="pb-2 text-2xl">Recuperar Senha</h1>
            <Input
              placeholder="Insira o seu email"
              register={{ ...register('email') }}
              name="email"
              errors={errors.email}
              label="E-mail"
            />
            <Button type="submit" loading={isSubmitting}>
              Enviar
            </Button>
            <Link href={ROUTES.PUBLIC.LOGIN}>Voltar ao Login.</Link>
            <Link href={ROUTES.PUBLIC.REGISTER}>Registrar uma conta.</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
