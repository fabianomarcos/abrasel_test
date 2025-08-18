import { User } from '../entities/user.entity'
import { IUserRepository } from '../repositories/IUserRepository'

export class ListUserByIdUseCase {
  constructor(private readonly usersRepository: IUserRepository) {}

  async execute(user_id: string): Promise<User | null> {
    const response = await this.usersRepository.listById(user_id)
    return response
  }
}
