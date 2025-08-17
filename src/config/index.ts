const isProduction = process.env.NODE_ENV === 'production'
const productionUrl = process.env.NEXT_PUBLIC_BASE_URL_API
const BASE_URL_API = isProduction ? productionUrl : 'http://localhost:3000/api'

export const CONFIG = {
  BASE_URL_API,
  JWT_SECRET: process.env.JWT_SECRET,
}
