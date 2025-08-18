import { NextRequest, NextResponse } from 'next/server'
import { BadRequestError } from '@/backend/errors/bad-request'
import { UsersRepository } from '../repositories/users.repository'
import { DeleteUserUseCase } from '../use-cases/delete-user.usecase'

class Controller {
  constructor(private deleteUserUsecase: DeleteUserUseCase) {}

  async delete(request: NextRequest): Promise<NextResponse> {
    const id = request.nextUrl.pathname.split('/').pop()
    if (!id) throw new BadRequestError('User id is required')
    await this.deleteUserUsecase.execute(id)
    return new NextResponse(null, { status: 204 })
  }
}

export function DeleteUserController() {
  const usersRepository = new UsersRepository()
  const deleteUserUsecase = new DeleteUserUseCase(usersRepository)
  return new Controller(deleteUserUsecase)
}
