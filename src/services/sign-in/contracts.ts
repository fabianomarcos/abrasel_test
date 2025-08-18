import { ResponseType } from '../types'

export type User = {
  id: string
  address_id: string
  email: string
  name: string
  role: 'ADMIN' | 'USER'
  active: boolean
  created_at: string
  updated_at: string
}

export interface IBodySignIn {
  password: string
  email: string
}

export interface IResponseSignIn {
  access_token: string
  user: User
}

export interface IBodySignIn {
  email: string
  password: string
}

export type SignInServiceContract = {
  signIn: (body: IBodySignIn) => Promise<ResponseType<IResponseSignIn>>
}

export interface IResponseGetMe {
  data: User
}
