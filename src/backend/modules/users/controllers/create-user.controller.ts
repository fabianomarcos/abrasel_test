import { NextRequest, NextResponse } from 'next/server'
import { UsersRepository } from '../repositories/users.repository'
import { CreateUserUseCase } from '../use-cases/create-user.usecase'
import { BcryptHash } from '@/backend/cryptography/implementations/bcrypt-hash'

class Controller {
  constructor(private createUserUsecase: CreateUserUseCase) {}

  async create(request: NextRequest): Promise<NextResponse> {
    const body = await request.json()
    const user = await this.createUserUsecase.execute(body)
    return NextResponse.json({ user })
  }
}

export function CreateUserController() {
  const usersRepository = new UsersRepository()
  const hashProvider = new BcryptHash()
  const createUserUsecase = new CreateUserUseCase(usersRepository, hashProvider)
  return new Controller(createUserUsecase)
}
