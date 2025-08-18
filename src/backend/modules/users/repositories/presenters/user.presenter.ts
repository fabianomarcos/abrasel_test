import { User as UserPrisma } from '@prisma/client'
import { User } from '../../entities/user.entity'

export class UserPresenter {
  static toHTTP(user: UserPrisma | null): User | null {
    if (!user) return null
    return {
      ...user,
      id: user.id,
      role: user.role,
      active: user.active,
      email: user.email,
      name: user.name,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }
  }

  static toArrayHTTP(users: UserPrisma[]): User[] {
    return users.map((user) => ({
      id: user.id,
      role: user.role,
      active: user.active,
      email: user.email,
      name: user.name,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }))
  }
}
