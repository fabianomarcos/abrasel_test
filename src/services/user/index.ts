import { IError } from '@/backend/interfaces'
import api, { treatmentForErrors } from '../api'
import {
  IBodySignUp,
  IBodyUpdateUser,
  IUser,
  UserServiceContract,
} from './contracts'
import { UserListResponse } from '@/app/(private)/list-users/hooks/use-get-users'

export class UserService implements UserServiceContract {
  async signUp(
    body: IBodySignUp,
  ): Promise<[{ user: IUser } | null, IError | null]> {
    const request = api.post(`users`, body)
    return treatmentForErrors(request)
  }

  async update(
    body: IBodyUpdateUser,
    user_id: string,
  ): Promise<[{ user: IUser } | null, IError | null]> {
    const request = api.put(`users/${user_id}`, body)
    return treatmentForErrors(request)
  }

  async delete(user_id: string): Promise<[void, IError | null]> {
    const request = api.delete(`users/${user_id}`)
    return treatmentForErrors(request)
  }

  async listById(
    user_id: string,
  ): Promise<[{ user: IUser } | null, IError | null]> {
    const request = api.get(`users/${user_id}`)
    return treatmentForErrors(request)
  }

  async list({
    page,
    perPage,
  }: {
    page: number
    perPage: number
  }): Promise<[{ users: UserListResponse } | null, IError | null]> {
    const request = api.get(`users?page=${page}&perPage=${perPage}`)
    return treatmentForErrors(request)
  }
}
