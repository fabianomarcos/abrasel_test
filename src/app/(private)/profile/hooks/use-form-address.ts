import { Toast } from '@/components/Toast'
import { ERRORS } from '@/translator'
import {
  AddressServiceContract,
  IBodyAddress,
} from '@/services/address/contracts'

type AddressProps = {
  addressService: AddressServiceContract
  address_id?: string
}

export function useFormAddress({ addressService, address_id }: AddressProps) {
  const update = async ({
    city,
    number,
    state,
    street,
    zip_code,
    neighborhood,
  }: IBodyAddress) => {
    const [, error] = await addressService.update({
      address_id: address_id as string,
      city,
      number,
      state,
      street,
      zip_code,
      neighborhood,
    })

    if (error) {
      console.error('error: ', error)
      const message = ERRORS(error?.message)
      Toast({ content: message, options: { type: 'error' } })
      return
    }

    Toast({
      content: `Tudo certo, seu endereço foi criado com sucesso!'`,
    })
  }

  const create = async ({
    city,
    number,
    state,
    street,
    zip_code,
    neighborhood,
  }: IBodyAddress) => {
    const [, error] = await addressService.create({
      city,
      number,
      state,
      street,
      zip_code,
      neighborhood,
    })

    if (error) {
      console.error('error: ', error)
      const message = ERRORS(error?.message)
      Toast({ content: message, options: { type: 'error' } })
      return
    }

    Toast({
      content: `Tudo certo, seu endereço foi criado com sucesso!'`,
    })
  }
  return { create, update }
}
