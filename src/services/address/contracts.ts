import { ResponseType } from '../types'

export interface IBodyAddress {
  street: string
  number: string
  city: string
  state: string
  neighborhood: string
  zip_code: string
}

export interface IResponseAddress {
  address: Address
}

export interface Address extends IBodyAddress {
  id: string
}

export type AddressServiceContract = {
  create: (body: IBodyAddress) => Promise<ResponseType<IResponseAddress>>
}
