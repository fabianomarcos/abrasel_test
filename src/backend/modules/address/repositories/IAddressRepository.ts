import {
  ListAddressResponse,
  Address,
  AddressOrm,
} from '../entities/address.entity'

export interface IAddressRepository {
  create: (input: AddressOrm) => Promise<Address | null>
  update: (input: AddressOrm, address_id: string) => Promise<Address | null>
  listById: (email: string) => Promise<Address | null>
}
