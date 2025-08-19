'use client'
import Link from 'next/link'

import { useValidateSchema } from '@/hooks/use-schema-validator'
import { registerFormSchema } from '@/schemas/register-form-schema'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Loader } from '@/components/Loader'
import { ROUTES } from '@/routes'
import { useSignUp } from './hooks/use-sign-up'
import { UserService } from '@/services/user'

const signUpService = new UserService()

export default function RegisterPage() {
  const { register, errors, handleSubmit, isSubmitting } =
    useValidateSchema(registerFormSchema)

  const { signUp } = useSignUp({ signUpService })

  return (
    <div className="flex overflow-hidden bg-[url('/login_background.webp')] bg-cover bg-center">
      <div className="flex h-full w-full items-center justify-center bg-gray-100 bg-gradient-to-br opacity-40" />
      <div className="bg-gray-700 opacity-80 sm:bg-gray-700 lg:bg-transparent lg:opacity-100">
        <div className="flex h-screen w-[310px] items-center justify-center sm:w-[330px]">
          {isSubmitting && <Loader />}
          <form
            className="flex h-full w-full flex-col justify-center gap-4 p-8"
            onSubmit={handleSubmit(signUp)}
          >
            <h1 className="pb-2 text-2xl">Cadastro</h1>
            <Input
              placeholder="Insira o seu email"
              register={{ ...register('name') }}
              name="name"
              errors={errors.name}
              label="Nome"
            />
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
            <Input
              placeholder="Insira a sua senha"
              name="confirmPassword"
              type="password"
              register={{ ...register('confirmPassword') }}
              errors={errors.confirmPassword}
              label="Confirmar Senha"
            />
            <Button type="submit">Cadastrar</Button>
            <Link href={ROUTES.PUBLIC.LOGIN}>Já tenho uma conta.</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
