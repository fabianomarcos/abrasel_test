import { IError } from '@/backend/interfaces'

export interface IBodySignUp {
  name: string
  password: string
  email: string
}

export interface IAddress {
  city: string
  created_at: string
  id: string
  neighborhood: string
  number: string
  state: string
  street: string
  updated_at: string
  user_id: string
  zip_code: string
}

export interface IUser {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'USER'
  active: boolean
  created_at: string
  updated_at: string
  Address?: IAddress
}

export interface IBodyUpdateUser {
  id: string
  name: string
  email: string
  current_password: string | null
  password?: string | null
}

export interface IResponseSignUp {
  user: IUser
}

export type UserServiceContract = {
  signUp: (
    body: IBodySignUp,
  ) => Promise<[{ user: IUser } | null, IError | null]>
  update: (
    body: IBodyUpdateUser,
    user_id: string,
  ) => Promise<[{ user: IUser } | null, IError | null]>
  listById: (
    user_id: string,
  ) => Promise<[{ user: IUser } | null, IError | null]>
}
