import { IError } from '@/backend/interfaces'
import api, { treatmentForErrors } from '../api'
import {
  IBodySignUp,
  IBodyUpdateUser,
  IUser,
  UserServiceContract,
} from './contracts'

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
}
