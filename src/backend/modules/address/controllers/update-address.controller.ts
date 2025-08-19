import { NextRequest, NextResponse } from 'next/server'
import { AddressRepository } from '../repositories/address.repository'
import { UpdateAddressUseCase } from '../use-cases/update-address.usecase'
import { BadRequestError } from '@/backend/errors/bad-request'

class Controller {
  constructor(private updateAddressUsecase: UpdateAddressUseCase) {}

  async update(request: NextRequest): Promise<NextResponse> {
    const id = request.nextUrl.pathname.split('/').pop()
    if (!id) throw new BadRequestError('Address id is required')
    const body = await request.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = (request as any).user
    const address = await this.updateAddressUsecase.execute({
      ...body,
      id,
      user_id: user.sub,
    })
    return NextResponse.json({ address })
  }
}

export function UpdateAddressController() {
  const addressRepository = new AddressRepository()
  const updateAddressUsecase = new UpdateAddressUseCase(addressRepository)
  return new Controller(updateAddressUsecase)
}
