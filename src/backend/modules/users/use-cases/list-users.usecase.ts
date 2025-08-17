import { IPaginated } from '@/backend/interfaces'
import { ListUserResponse } from '../entities/user.entity'
import { IUserRepository } from '../repositories/IUserRepository'
import {
  paginationSchema,
  PaginationType,
} from '@/backend/validator/zod/pagination'
import { validateWithPipe } from '@/backend/pipes/zod-validation-pipe'

export class ListUsersUseCase {
  constructor(private readonly usersRepository: IUserRepository) {}

  async execute({ page, perPage }: IPaginated): Promise<ListUserResponse> {
    const pagination = validateWithPipe<PaginationType>(paginationSchema, {
      page,
      perPage,
    })

    const response = await this.usersRepository.list({
      page: +pagination.page,
      perPage: +pagination.perPage,
    })

    return response
  }
}
