'use client'
import { Input } from '@/components/Input'
import { useValidateSchema } from '@/hooks/use-schema-validator'
import { Loader } from '@/components/Loader'
import { Button } from '@/components/Button'
import { Save } from '@/components/Icons'
import { UserService } from '@/services/user'
import { useUpdateUser } from '../hooks/use-update-user'
import { updateFormSchema } from '@/schemas/update-form-schema'
import { userStore } from '@/stores/user-store'
import { useEffect } from 'react'

const userService = new UserService()

export const ProfileForm = () => {
  const { update } = useUpdateUser({ userService })
  const { user } = userStore()
  const { register, errors, handleSubmit, isSubmitting, setValue } =
    useValidateSchema(updateFormSchema)

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
          type="password"
          errors={errors?.current_password}
          register={{ ...register('current_password') }}
        />
        <Input
          name="password"
          label="Nova senha"
          placeholder="Digite sua nova senha"
          errors={errors?.password}
          type="password"
          register={{ ...register('password') }}
        />
      </div>

      <div className="flex w-full justify-end pt-3 pr-10">
        <Button>
          <Save size={24} />
          Salvar
        </Button>
      </div>
    </form>
  )
}
