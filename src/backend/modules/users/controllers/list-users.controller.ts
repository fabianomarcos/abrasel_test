import { NextRequest, NextResponse } from 'next/server'
import { UsersRepository } from '../repositories/users.repository'
import { ListUsersUseCase } from '../use-cases/list-users.usecase'

class Controller {
  constructor(private listUsersUsecase: ListUsersUseCase) {}

  async listUsers(request: NextRequest): Promise<NextResponse> {
    const { searchParams } = request.nextUrl
    const page = searchParams.get('page')
    const perPage = searchParams.get('perPage')

    const users = await this.listUsersUsecase.execute({ page, perPage })
    return NextResponse.json({ users })
  }
}

export function ListUsersController() {
  const usersRepository = new UsersRepository()
  const listUsersUsecase = new ListUsersUseCase(usersRepository)
  return new Controller(listUsersUsecase)
}
