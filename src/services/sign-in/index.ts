import { ResponseType } from '../types'
import api, { treatmentForErrors } from '../api'
import { IBodySignIn, IResponseGetMe, IResponseSignIn } from './types'

export const signInService = ({
  email,
  password,
}: IBodySignIn): Promise<ResponseType<IResponseSignIn>> => {
  const request = api.post(`session`, { email, password })
  return treatmentForErrors(request)
}

export const getMeService = (
  token: string,
): Promise<ResponseType<IResponseGetMe>> => {
  const request = api.get(`/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return treatmentForErrors(request)
}
