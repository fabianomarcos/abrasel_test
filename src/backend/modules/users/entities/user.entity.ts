import { Response } from '@/backend/interfaces'
import { User as UserPrisma } from '@prisma/client'

export type RoleType = 'ADMIN' | 'USER'

export class User {
  id!: string
  name!: string
  email!: string
  password?: string | null
  role?: RoleType | null
  active!: boolean
  address_id?: string | null

  created_at?: Date
  updated_at?: Date
}

export type UpdateUser = User & { user_id: string }

export type UserOrm = UserPrisma

export type CreateUser = Omit<UserPrisma, 'id' | 'created_at' | 'updated_at'>

export type ListUserResponse = Response<User>
