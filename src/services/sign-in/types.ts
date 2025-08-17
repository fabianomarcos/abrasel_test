export type User = {
  id: string
  email: string
  name: string
}

export interface IResponseGetMe {
  data: User
}

export interface IBodySignIn {
  password: string
  email: string
}

export interface IResponseSignIn {
  access_token: string
  user: User
}
