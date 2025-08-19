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
import { useFormAddress } from '../hooks/use-form-address'
import { useValidateSchema } from '@/hooks/use-schema-validator'

const addressService = new AddressService()
const userService = new UserService()

export const AddressForm = () => {
  const [cep, setCep] = useState('')
  const { user } = useGetUserById({ userService })
  const { create, update } = useFormAddress({
    addressService,
    address_id: user?.Address?.id,
  })
  const { register, errors, handleSubmit, isSubmitting, setValue } =
    useValidateSchema(addressFormSchema)

  const onChangeCep = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value.length === 9) setCep(sanitizeCEP(value))
  }

  const { dataCep, blockFields, loading } = useGetCep(cep)
  const { city, state, street, neighborhood } = dataCep

  useEffect(() => {
    if (user?.Address?.zip_code) {
      setValue('zip_code', user.Address.zip_code || '', {
        shouldValidate: true,
      })
      setCep(user?.Address?.zip_code || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.Address?.zip_code])

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
      onSubmit={handleSubmit(user?.Address?.id ? update : create)}
      className="flex w-full flex-col gap-4 rounded-md bg-gray-900 p-8"
    >
      {(isSubmitting || loading) && <Loader />}
      <span className="mb-4 text-2xl">Meu Endereço</span>

      <div className="grid w-full grid-cols-1 items-center gap-4 md:grid-cols-2">
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

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
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

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
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

      <div className="flex w-full justify-end pt-3">
        <Button classNameOut="w-full max-w-full sm:max-w-36 sm:w-36">
          <Save size={24} />
          Salvar
        </Button>
      </div>
    </form>
  )
}
