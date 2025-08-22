'use client'
import Link from 'next/link'
import { useState } from 'react'

import { ROUTES } from '@/routes'
import { loginFormSchema } from '@/schemas/login-form-schema'
import { useValidateSchema } from '@/hooks/use-schema-validator'

import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Loader } from '@/components/Loader'
import { useSignIn } from './hooks/use-sign-in'
import { SignInService } from '@/services/sign-in'
import { Email, PasswordIcon } from '@/components/Icons'

const signInService = new SignInService()

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, errors, handleSubmit, isSubmitting } =
    useValidateSchema(loginFormSchema)

  const togglePassword = () => setShowPassword((prev) => !prev)

  const { signIn } = useSignIn({ signInService })

  return (
    <div className="flex overflow-hidden bg-[url('/login_background.webp')] bg-cover bg-center">
      <div className="flex h-full w-full items-center justify-center bg-gray-100 bg-gradient-to-br opacity-40" />
      <div className="bg-gray-700 opacity-80 sm:bg-gray-700 lg:bg-transparent lg:opacity-100">
        <div className="flex h-screen w-[310px] items-center justify-center sm:w-[330px]">
          {isSubmitting && <Loader />}
          <form
            className="flex h-full w-full flex-col justify-center gap-4 p-8"
            onSubmit={handleSubmit(signIn)}
          >
            <h1 className="pb-2 text-2xl">Login</h1>
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
            <Button type="submit" loading={isSubmitting}>
              Entrar
            </Button>
            <Link href={ROUTES.PUBLIC.FORGOT_PASSWORD}>
              Esqueci minha senha.
            </Link>
            <Link href={ROUTES.PUBLIC.REGISTER}>Registrar uma conta.</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
