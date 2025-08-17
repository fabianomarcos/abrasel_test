import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { tokenStore } from '@/stores/token-store'

import { CONFIG } from '@/config'

const api = axios.create({
  baseURL: CONFIG.BASE_URL_API,
})

interface AxiosError {
  response: { data: { error: string; status: number } }
}

export const treatmentForErrors = async <T, E>(
  request: Promise<AxiosResponse<T, unknown>>,
): Promise<[T | null, E | null]> => {
  try {
    const response = await request
    const data = response.data as T
    return [data, null] as [T | null, E | null]
  } catch (err: unknown) {
    const axiosError = err as AxiosError
    const message =
      axiosError?.response?.data?.error ||
      'An error occurred, please try later.'
    const error = {
      message,
      status: axiosError?.response?.data?.status || 500,
    } as E
    return [null, error]
  }
}

export const headers = {
  Authorization: `Bearer ${tokenStore.getState().token}`,
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStore.getState().token
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
