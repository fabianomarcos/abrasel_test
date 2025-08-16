'use client'
import Link from 'next/link'

import { useValidateSchema } from '@/hooks/use-schema-validator'
// import { useAuth } from '@/hooks/AuthContext'
import {
  registerFormSchema,
  RegisterFormSchemaType,
} from '@/schemas/register-form-schema'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Loader } from '@/components/Loader'
import { Info } from '@/components/Icons'

export default function RegisterPage() {
  const { register, errors, handleSubmit, isSubmitting } =
    useValidateSchema(registerFormSchema)

  const signUp = (data: RegisterFormSchemaType) => {
    console.log('data: ', data)
  }

  return (
    <div className="flex bg-[url('/login_background.webp')] bg-cover bg-center">
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br bg-gray-100 opacity-40" />
      <div className="flex justify-center items-center h-screen p-8">
        {/* {!isSubmitting && <Loader />} */}
        <form
          className="gap-4 flex p-8 justify-center flex-col w-full h-full"
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
          <Link href="/forgot-password">Esqueci minha senha.</Link>
          <Link href="/register">Registrar uma conta.</Link>
        </form>
      </div>
    </div>
  )
}
