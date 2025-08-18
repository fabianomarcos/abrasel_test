import zipCodeApi from '@/services/zip-code-api'
import { useCallback, useEffect, useState } from 'react'

export interface ICep {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  service: string
}

export const useGetCep = (cep: string) => {
  const [loading, setLoading] = useState(false)
  const [dataCep, setDataCep] = useState({} as ICep)
  const [blockFields, setBlockFields] = useState(false)

  const getCep = useCallback(async () => {
    if (!cep) return

    try {
      setLoading(true)
      const { data } = await zipCodeApi.get<ICep>(`/${cep}`)
      setBlockFields(!!data.city)
      setDataCep(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setBlockFields(false)
      console.error('error: ', error)
      alert(
        'Ocorreu algum erro ao buscar o cep, por favor, preencha manualmente.',
      )
    }
  }, [cep])

  useEffect(() => {
    if (!loading) getCep()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCep])

  return {
    dataCep,
    blockFields,
    loading,
  }
}
