'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import { Input } from '@/components/Input'
import { Save } from '@/components/Icons'
import { addressFormSchema } from '@/schemas/address-form-schema'
import { Loader } from '@/components/Loader'
import { Button } from '@/components/Button'

import {
  cepPattern,
  handleKeyUpCep,
  sanitizeCEP,
} from '@/utils/formatting/zip-code'
import { UserService } from '@/services/user'
import { useGetCep } from '../hooks/use-get-cep'
import { AddressService } from '@/services/address'
import { useGetUserById } from '../hooks/use-get-user-by-id'
import { useCreateAddress } from '../hooks/use-create-address'
import { useValidateSchema } from '@/hooks/use-schema-validator'

const addressService = new AddressService()
const userService = new UserService()

export const AddressForm = () => {
  const [cep, setCep] = useState('')

  const { create } = useCreateAddress({ addressService })
  const { user } = useGetUserById({ userService })
  const { register, errors, handleSubmit, isSubmitting, setValue } =
    useValidateSchema(addressFormSchema)

  const onChangeCep = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value.length === 9) setCep(sanitizeCEP(value))
  }

  const { dataCep, blockFields, loading } = useGetCep(cep)
  const { city, state, street, neighborhood } = dataCep

  useEffect(() => {
    if (user?.user?.Address?.zip_code) {
      setValue('zip_code', user.user.Address.zip_code || '', {
        shouldValidate: true,
      })
      setCep(user?.user?.Address?.zip_code || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (blockFields) {
      setValue('state', state || '', { shouldValidate: true })
      setValue('city', city || '', { shouldValidate: true })
      setValue('street', street || '', { shouldValidate: true })
      setValue('neighborhood', neighborhood || '', { shouldValidate: true })
    }
  }, [blockFields, city, state, street, neighborhood, setValue])

  return (
    <form
      onSubmit={handleSubmit(create)}
      className="flex flex-col gap-4 bg-gray-900 w-full rounded-md p-8"
    >
      {(isSubmitting || loading) && <Loader />}
      <span className="text-2xl mb-4">Meu Endereço</span>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <Input
          name="zip_code"
          label="Cep"
          onChange={onChangeCep}
          placeholder="xx.xxx.xxx-xx"
          onKeyUp={handleKeyUpCep}
          pattern={cepPattern}
          errors={errors?.zip_code}
          register={{ ...register('zip_code') }}
        />
        <Input
          name="street"
          label="Rua"
          placeholder="Digite sua rua"
          errors={errors?.street}
          register={{ ...register('street') }}
          value={blockFields ? street : undefined}
          disabled={blockFields}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <Input
          name="neighborhood"
          label="Bairro"
          placeholder="Digite seu bairro"
          errors={errors?.neighborhood}
          register={{ ...register('neighborhood') }}
          value={blockFields ? neighborhood : undefined}
          disabled={blockFields}
        />
        <Input
          name="city"
          label="Cidade"
          placeholder="Digite sua cidade"
          errors={errors?.city}
          register={{ ...register('city') }}
          value={blockFields ? city : undefined}
          disabled={blockFields}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <Input
          name="state"
          label="Estado"
          placeholder="Digite seu estado"
          errors={errors?.state}
          register={{ ...register('state') }}
          value={blockFields ? state : undefined}
          disabled={blockFields}
        />
        <Input
          name="number"
          label="Número"
          placeholder="Digite seu número"
          errors={errors?.number}
          register={{ ...register('number') }}
        />
      </div>

      <div className="flex justify-end w-full pr-10 pt-3">
        <Button>
          <Save size={24} />
          Salvar
        </Button>
      </div>
    </form>
  )
}
