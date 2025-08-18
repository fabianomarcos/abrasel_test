import { NextRequest, NextResponse } from 'next/server'
import { BadRequestError } from '@/backend/errors/bad-request'
import { UsersRepository } from '../repositories/users.repository'
import { UpdateUserUseCase } from '../use-cases/update-user.usecase'
import { BcryptHash } from '@/backend/cryptography/implementations/bcrypt-hash'

class Controller {
  constructor(private updateUserUsecase: UpdateUserUseCase) {}

  async update(request: NextRequest): Promise<NextResponse> {
    const body = await request.json()
    const id = request.nextUrl.pathname.split('/').pop()
    if (!id) throw new BadRequestError('User id is required')
    const user = await this.updateUserUsecase.execute({ ...body, id })
    return NextResponse.json({ user })
  }
}

export function UpdateUserController() {
  const usersRepository = new UsersRepository()
  const hashCompare = new BcryptHash()
  const hashProvider = new BcryptHash()
  const updateUserUsecase = new UpdateUserUseCase(
    usersRepository,
    hashCompare,
    hashProvider,
  )
  return new Controller(updateUserUsecase)
}
