'use client'
import Link from 'next/link'
import { useState } from 'react'

import { UserService } from '@/services/user'
import { useSignUp } from './hooks/use-sign-up'
import { useValidateSchema } from '@/hooks/use-schema-validator'
import { registerFormSchema } from '@/schemas/register-form-schema'

import { ROUTES } from '@/routes'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Loader } from '@/components/Loader'
import { Email, IName, PasswordIcon } from '@/components/Icons'

const signUpService = new UserService()

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => setShowPassword((prev) => !prev)

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
              placeholder="Insira o seu nome"
              register={{ ...register('name') }}
              name="name"
              errors={errors.name}
              label="Nome"
              icon={<IName />}
            />
            <Input
              placeholder="Insira o seu email"
              register={{ ...register('email') }}
              name="email"
              errors={errors.email}
              label="E-mail"
              icon={<Email />}
            />
            <Input
              placeholder="Insira a sua senha"
              name="password"
              type={showPassword ? 'text' : 'password'}
              register={{ ...register('password') }}
              errors={errors.password}
              label="Senha"
              icon={PasswordIcon(showPassword, togglePassword)}
            />
            <Input
              placeholder="Insira a sua senha"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              register={{ ...register('confirmPassword') }}
              errors={errors.confirmPassword}
              label="Confirmar Senha"
              icon={PasswordIcon(showPassword, togglePassword)}
            />
            <Button type="submit">Cadastrar</Button>
            <Link href={ROUTES.PUBLIC.LOGIN}>Já tenho uma conta.</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
