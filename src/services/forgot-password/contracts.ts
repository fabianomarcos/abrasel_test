import { ResponseType } from '../types'

export interface IBodyForgotPassword {
  email: string
}

export interface IResponseForgotPassword {
  token: string
}

export type ForgotPasswordServiceContract = {
  forgotPassword: (
    body: IBodyForgotPassword,
  ) => Promise<ResponseType<IResponseForgotPassword>>
}
