'use client'
import { useEffect, useState } from 'react'

import { Input } from '@/components/Input'
import { Loader } from '@/components/Loader'
import { Button } from '@/components/Button'
import { PasswordIcon, Save } from '@/components/Icons'

import { UserService } from '@/services/user'
import { userStore } from '@/stores/user-store'
import { useUpdateUser } from '../hooks/use-update-user'
import { updateFormSchema } from '@/schemas/update-form-schema'
import { useValidateSchema } from '@/hooks/use-schema-validator'

const userService = new UserService()

export const ProfileForm = () => {
  const { user } = userStore()
  const { update } = useUpdateUser({ userService })
  const [showPassword, setShowPassword] = useState(false)

  const { register, errors, handleSubmit, isSubmitting, setValue } =
    useValidateSchema(updateFormSchema)

  const togglePassword = () => setShowPassword((prev) => !prev)

  useEffect(() => {
    setValue('name', user?.name || '', { shouldValidate: true })
    setValue('email', user?.email || '', { shouldValidate: true })
  }, [setValue, user?.email, user?.name])

  return (
    <form
      onSubmit={handleSubmit(update)}
      className="flex w-full flex-col gap-4 rounded-md bg-gray-900 p-6 sm:p-8"
    >
      {isSubmitting && <Loader />}
      <span className="mb-4 text-2xl">Meu Perfil</span>

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
        <Input
          name="name"
          label="Nome"
          placeholder="Insira seu nome"
          errors={errors?.name}
          register={{ ...register('name') }}
        />
        <Input
          name="email"
          label="E-mail"
          placeholder="Digite seu email"
          errors={errors?.email}
          register={{ ...register('email') }}
          disabled
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
        <Input
          name="current_password"
          label="Senha atual"
          placeholder="Digite sua senha atual"
          type={showPassword ? 'text' : 'password'}
          errors={errors?.current_password}
          register={{ ...register('current_password') }}
          icon={PasswordIcon(showPassword, togglePassword)}
        />
        <Input
          name="password"
          label="Nova senha"
          placeholder="Digite sua nova senha"
          errors={errors?.password}
          type={showPassword ? 'text' : 'password'}
          register={{ ...register('password') }}
          icon={PasswordIcon(showPassword, togglePassword)}
        />
      </div>

      <div className="flex w-full justify-end pt-3">
        <Button classNameOut="w-full max-w-full sm:max-w-36 sm:w-36">
          <Save size={24} />
          Salvar
        </Button>
      </div>
    </form>
  )
}
