import { IPaginatedFormatted } from '@/backend/interfaces'
import { ListUserResponse, User, UserOrm } from '../entities/user.entity'

export interface IUserRepository {
  create: (input: UserOrm) => Promise<User | null>
  update: (input: UserOrm, user_id: string) => Promise<User | null>
  delete: (user_id: string) => Promise<void>
  listById: (email: string) => Promise<User | null>
  listByEmail: (email: string) => Promise<User | null>
  list: (params: IPaginatedFormatted) => Promise<ListUserResponse>
}
