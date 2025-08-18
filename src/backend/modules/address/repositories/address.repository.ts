import { AddressPresenter } from './presenters/address.presenter'
import { IAddressRepository } from './IAddressRepository'
import {
  ListAddressResponse,
  Address,
  AddressOrm,
} from '../entities/address.entity'
import { prisma } from '@/backend/infra/database/prisma/prisma.service'
import { IPaginatedFormatted } from '@/backend/interfaces'

export class AddressRepository implements IAddressRepository {
  async list({
    page,
    perPage,
  }: IPaginatedFormatted): Promise<ListAddressResponse> {
    const [response, total] = await Promise.all([
      prisma.address.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: {
          created_at: 'desc',
        },
      }),
      prisma.address.count(),
    ])

    const data = AddressPresenter.toArrayHTTP(response)
    const totalPages = Math.ceil(total / perPage)
    return { data, page, perPage, total, totalPages }
  }

  async listById(id: string): Promise<Address | null> {
    const address = await prisma.address.findUnique({ where: { id } })
    return AddressPresenter.toHTTP(address)
  }

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

  async delete(id: string): Promise<void> {
    await prisma.address.delete({
      where: { id },
    })
  }
}
