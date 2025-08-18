export const handleKeyUpCep = (e?: React.FormEvent<HTMLInputElement>) => {
  if (!e) return

  e.currentTarget.maxLength = 9
  let value = e.currentTarget.value

  value = value.replace(/\D/g, '')

  if (value.length >= 6) value = value.replace(/^(\d{5})(\d)/, '$1-$2')

  e.currentTarget.value = value
}

export const sanitizeCEP = (cepMask: string) => cepMask.replace(/\D/g, '')

export const removeKeyUpValues = (e: React.FormEvent<HTMLInputElement>) => {
  e.currentTarget.value = ''
}

export const cepMask = (cep: string) => {
  const regex = (text: string) => text.replace(/(\d{5})(\d{3})/, '$1-$2')
  return cep ? regex(cep) : ''
}

export const cepPattern = '[0-9]{5}-[0-9]{3}'
