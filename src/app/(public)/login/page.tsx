'use client'
import Link from 'next/link'

import { useValidateSchema } from '@/hooks/use-schema-validator'
import BackgroundImage from 'public/login_background.webp'
// import { useAuth } from '@/hooks/AuthContext'
import {
  loginFormSchema,
  LoginFormSchemaType,
} from '@/schemas/login-form-schema'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Loader } from '@/components/Loader'
import { Info } from '@/components/Icons'

export default function LoginPage() {
  const { register, errors, handleSubmit, isSubmitting } =
    useValidateSchema(loginFormSchema)

  const signIn = (data: LoginFormSchemaType) => {
    console.log('data: ', data)
  }

  return (
    <div className="flex bg-[url('/login_background.webp')] bg-cover bg-center">
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br bg-gray-100 opacity-40" />
      <div className="flex justify-center items-center h-screen p-8">
        {/* {!isSubmitting && <Loader />} */}
        <form
          className="gap-4 flex p-8 justify-center flex-col w-full h-full"
          onSubmit={handleSubmit(signIn)}
        >
          <h1 className="pb-8 text-2xl">Login</h1>
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
          <Button type="submit">Entrar</Button>
          <Link href="/forgot-password">Esqueci minha senha.</Link>
          <Link href="/register">Registrar uma conta.</Link>
        </form>
      </div>
    </div>
  )
}
