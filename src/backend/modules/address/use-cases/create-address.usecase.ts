import { Address, AddressOrm } from '../entities/address.entity'
import { IAddressRepository } from '../repositories/IAddressRepository'
import { FieldValidator } from '@/backend/errors/field-validator'

export class CreateAddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(input: AddressOrm): Promise<Address> {
    const { city, neighborhood, number, state, street, zip_code, user_id } =
      input

    FieldValidator.validateRequiredFields({
      city,
      neighborhood,
      number,
      state,
      street,
      zip_code,
      user_id,
    })

    const response = await this.addressRepository.create(input)

    const address = { ...response } as Address

    return address
  }
}
