import { UserPresenter } from './presenters/user.presenter'
import { IUserRepository } from './IUserRepository'
import { ListUserResponse, User } from '../entities/user.entity'
import { User as UserPrisma } from '@prisma/client'
import { prisma } from '@/backend/infra/database/prisma/prisma.service'
import { IPaginatedFormatted } from '@/backend/interfaces'

export class UsersRepository implements IUserRepository {
  async list({
    page,
    perPage,
  }: IPaginatedFormatted): Promise<ListUserResponse> {
    const [response, total] = await Promise.all([
      prisma.user.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: {
          created_at: 'desc',
        },
      }),
      prisma.user.count(),
    ])

    const data = UserPresenter.toArrayHTTP(response)
    const totalPages = Math.ceil(total / perPage)
    return { data, page, perPage, total, totalPages }
  }

  async listById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } })
    return UserPresenter.toHTTP(user)
  }

  async listByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })
    return UserPresenter.toHTTP(user)
  }

  async create(data: UserPrisma): Promise<User | null> {
    const user = await prisma.user.create({
      data,
    })
    return UserPresenter.toHTTP(user)
  }

  async update(data: UserPrisma, user_id: string): Promise<User | null> {
    const user = await prisma.user.update({
      where: { id: user_id },
      data,
    })
    return UserPresenter.toHTTP(user)
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    })
  }
}
