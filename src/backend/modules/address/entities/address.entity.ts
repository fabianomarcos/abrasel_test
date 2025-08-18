import { Response } from '@/backend/interfaces'
import { Address as AddressPrisma } from '@prisma/client'

export class Address {
  id!: string
  street!: string
  neighborhood!: string
  number!: string
  city!: string
  state!: string
  zip_code!: string

  created_at?: Date
  updated_at?: Date
}

export type AddressOrm = AddressPrisma

export type CreateAddress = Omit<
  AddressPrisma,
  'id' | 'created_at' | 'updated_at'
>

export type ListAddressResponse = Response<Address>
