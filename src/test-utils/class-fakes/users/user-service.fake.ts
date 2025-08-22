import { IError } from '@/backend/interfaces'
import { User } from '@/services/sign-in/contracts'
import { IUser, UserServiceContract } from '@/services/user/contracts'
import { generateUsers } from '@/test-utils/data-fake'

export class FakeUserService implements UserServiceContract {
  constructor(private users: User[]) {
    this.users = users
  }

  async list({
    page = 1,
    perPage = 1,
  }: {
    page: number
    perPage: number
  }): Promise<
    [
      {
        users: { data: User[]; total: number; page: number; perPage: number }
      } | null,
      null,
    ]
  > {
    const data = this.users
    const users = { data, total: 100, page, perPage }
    console.log('users fake: ', users.data[0])
    return [{ users }, null]
  }

  async delete(): Promise<[void, IError | null]> {
    return [undefined, null]
  }

  async signUp(): Promise<[{ user: IUser } | null, IError | null]> {
    const [user] = generateUsers(1)
    return [{ user }, null]
  }

  async update(): Promise<[{ user: IUser } | null, IError | null]> {
    const [data] = generateUsers(1)
    const user = data as IUser
    return [{ user }, null]
  }

  async listById(): Promise<[{ user: IUser } | null, IError | null]> {
    const [user] = generateUsers(1)
    return [{ user }, null]
  }
}
