import { IError } from '@/backend/interfaces'

export interface IBodySignUp {
  name: string
  password: string
  email: string
}

export interface IUser {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'USER'
  active: boolean
  created_at: string
  updated_at: string
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
}
