import { NextRequest, NextResponse } from 'next/server'
import { AddressRepository } from '../repositories/address.repository'
import { CreateAddressUseCase } from '../use-cases/create-address.usecase'

class Controller {
  constructor(private createAddressUsecase: CreateAddressUseCase) {}

  async create(request: NextRequest): Promise<NextResponse> {
    const body = await request.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = (request as any).user
    const address = await this.createAddressUsecase.execute({
      ...body,
      user_id: user.sub,
    })
    return NextResponse.json({ address })
  }
}

export function CreateAddressController() {
  const addressRepository = new AddressRepository()
  const createAddressUsecase = new CreateAddressUseCase(addressRepository)
  return new Controller(createAddressUsecase)
}
