import { ResponseType } from '../types'
import api, { treatmentForErrors } from '../api'
import {
  IBodyForgotPassword,
  IResponseForgotPassword,
  ForgotPasswordServiceContract,
} from './contracts'

export class ForgotPasswordService implements ForgotPasswordServiceContract {
  async forgotPassword({
    email,
  }: IBodyForgotPassword): Promise<ResponseType<IResponseForgotPassword>> {
    const request = api.post(`forgot-password`, { email })
    return treatmentForErrors(request)
  }
}
