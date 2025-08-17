import { ResponseType } from '../types'
import { IError } from '@/backend/interfaces'
import api, { treatmentForErrors } from '../api'
import {
  IBodySignUp,
  IResponseSignUp,
  IUser,
  SignUpServiceContract,
} from './contracts'

export const getMeService = (): Promise<ResponseType<IResponseSignUp>> => {
  const request = api.get(`/users/me`)
  return treatmentForErrors(request)
}

export class SignUpService implements SignUpServiceContract {
  async signUp(
    body: IBodySignUp,
  ): Promise<[{ user: IUser } | null, IError | null]> {
    const request = api.post(`users`, body)
    return treatmentForErrors(request)
  }
}
