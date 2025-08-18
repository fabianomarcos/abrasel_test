import { ResponseType } from '../types'
import api, { treatmentForErrors } from '../api'
import {
  IBodyAddress,
  IResponseAddress,
  AddressServiceContract,
} from './contracts'

export class AddressService implements AddressServiceContract {
  async create({
    street,
    number,
    city,
    state,
    zip_code,
    neighborhood,
  }: IBodyAddress): Promise<ResponseType<IResponseAddress>> {
    const request = api.post(`address`, {
      street,
      number,
      city,
      state,
      zip_code,
      neighborhood,
    })
    return treatmentForErrors(request)
  }
}
