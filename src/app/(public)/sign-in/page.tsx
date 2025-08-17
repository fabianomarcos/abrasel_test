'use client'
import Link from 'next/link'

import { ROUTES } from '@/routes'
import { loginFormSchema } from '@/schemas/login-form-schema'
import { useValidateSchema } from '@/hooks/use-schema-validator'

import { Input } from '@/components/Input'
import useSignIn from './hooks/use-sign-in'
import { Button } from '@/components/Button'
import { Loader } from '@/components/Loader'

export default function LoginPage() {
  const { register, errors, handleSubmit, isSubmitting } =
    useValidateSchema(loginFormSchema)

  const { signIn } = useSignIn()

  return (
    <div className="flex bg-[url('/login_background.webp')] bg-cover bg-center">
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br bg-gray-100 opacity-40" />
      <div className="flex justify-center items-center h-screen p-8">
        {isSubmitting && <Loader />}
        <form
          className="gap-4 flex p-8 justify-center flex-col w-full h-full"
          onSubmit={handleSubmit(signIn)}
        >
          <h1 className="pb-2 text-2xl">Login</h1>
          <Input
            placeholder="Insira o seu email"
            register={{ ...register('email') }}
            name="email"
            errors={errors.email}
            label="E-mail"
          />
          <Input
            placeholder="Insira a sua senha"
            name="password"
            type="password"
            register={{ ...register('password') }}
            errors={errors.password}
            label="Senha"
          />
          <Button type="submit" loading={isSubmitting}>
            Entrar
          </Button>
          <Link href={ROUTES.PUBLIC.FORGOT_PASSWORD}>Esqueci minha senha.</Link>
          <Link href={ROUTES.PUBLIC.REGISTER}>Registrar uma conta.</Link>
        </form>
      </div>
    </div>
  )
}
