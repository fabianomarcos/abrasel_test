import { Toast } from '@/components/Toast'
import { ERRORS } from '@/translator'
import {
  AddressServiceContract,
  IBodyAddress,
} from '@/services/address/contracts'

type AddressProps = {
  addressService: AddressServiceContract
}

export function useCreateAddress({ addressService }: AddressProps) {
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
  return { create }
}
