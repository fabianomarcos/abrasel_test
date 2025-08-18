import { Address as AddressPrisma } from '@prisma/client'
import { Address } from '../../entities/address.entity'

export class AddressPresenter {
  private static transform(address: AddressPrisma): Address {
    return {
      id: address.id,
      zip_code: address.zip_code,
      state: address.state,
      city: address.city,
      number: address.number,
      neighborhood: address.neighborhood,
      street: address.street,
      created_at: address.created_at,
      updated_at: address.updated_at,
    }
  }

  static toHTTP(address: AddressPrisma | null): Address | null {
    if (!address) return null
    return this.transform(address)
  }

  static toArrayHTTP(address: AddressPrisma[]): Address[] {
    return address.map((address) => this.transform(address))
  }
}
