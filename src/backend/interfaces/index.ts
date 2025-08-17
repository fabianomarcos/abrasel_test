export interface Response<T> {
  data: T[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface IResponse<T> {
  [x: string]: number | T
  count: number
  totalPages: number
  page: number
  perPage: number
}

export interface IPaginated {
  page: string | null
  perPage: string | null
}

export interface IPaginatedFormatted {
  page: number
  perPage: number
}

export interface IError {
  message: string
  statusCode: number
  status: number
}

export interface IParams<T> {
  params: T
}

export interface ILogin {
  login: string
  password: string
}
