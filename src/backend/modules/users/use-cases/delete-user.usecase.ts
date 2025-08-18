import { BadRequestError } from '@/backend/errors/bad-request'
import { IUserRepository } from '../repositories/IUserRepository'

export class DeleteUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(userId: string): Promise<void> {
    const existingUser = await this.usersRepository.listById(userId)
    if (!existingUser) throw new BadRequestError('User not exists')
    await this.usersRepository.delete(userId)
  }
}
