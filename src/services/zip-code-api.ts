import axios from 'axios'

const zipCodeApi = axios.create({
  baseURL: 'https://brasilapi.com.br/api/cep/v1/',
})

export default zipCodeApi
