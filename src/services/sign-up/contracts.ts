import { IError } from '@/backend/interfaces'

export interface IBodySignUp {
  name: string
  password: string
  confirmPassword: string
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

export interface IResponseSignUp {
  user: IUser
}

export type SignUpServiceContract = {
  signUp: (
    body: IBodySignUp,
  ) => Promise<[{ user: IUser } | null, IError | null]>
}
