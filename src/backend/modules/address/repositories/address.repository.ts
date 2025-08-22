import { AddressPresenter } from './presenters/address.presenter'
import { IAddressRepository } from './IAddressRepository'
import { Address, AddressOrm } from '../entities/address.entity'
import { prisma } from '@/backend/infra/database/prisma/prisma.service'

export class AddressRepository implements IAddressRepository {
  async create(data: AddressOrm): Promise<Address | null> {
    const address = await prisma.address.create({
      data,
    })
    return AddressPresenter.toHTTP(address)
  }

  async update(data: AddressOrm, address_id: string): Promise<Address | null> {
    const address = await prisma.address.update({
      where: { id: address_id },
      data,
    })
    return AddressPresenter.toHTTP(address)
  }
}
