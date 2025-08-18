import { NextRequest, NextResponse } from 'next/server'
import { UsersRepository } from '../repositories/users.repository'
import { ListUserByIdUseCase } from '../use-cases/list-user-by-id.usecase'
import { BadRequestError } from '@/backend/errors/bad-request'

class Controller {
  constructor(private listUserByIdUsecase: ListUserByIdUseCase) {}

  async listUser(request: NextRequest): Promise<NextResponse> {
    const id = request.nextUrl.pathname.split('/').pop()
    if (!id) throw new BadRequestError('User id is required')

    const user = await this.listUserByIdUsecase.execute(id)
    return NextResponse.json({ user })
  }
}

export function ListUserByIdController() {
  const usersRepository = new UsersRepository()
  const listUserByIdUsecase = new ListUserByIdUseCase(usersRepository)
  return new Controller(listUserByIdUsecase)
}
