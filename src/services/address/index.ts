import { ResponseType } from '../types'
import api, { treatmentForErrors } from '../api'
import {
  IBodyAddress,
  IResponseAddress,
  AddressServiceContract,
  IBodyUpdateAddress,
} from './contracts'

export class AddressService implements AddressServiceContract {
  async update({
    address_id,
    city,
    neighborhood,
    number,
    state,
    street,
    zip_code,
  }: IBodyUpdateAddress): Promise<ResponseType<IResponseAddress>> {
    const request = api.put(`address/${address_id}`, {
      id: address_id,
      city,
      neighborhood,
      number,
      state,
      street,
      zip_code,
    })
    return treatmentForErrors(request)
  }

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
