import { BadRequestError } from '../errors/bad-request'

export function validatePassword(password: string) {
  const errors: string[] = []
  const message = (errors: string[]) =>
    errors.length === 0 ? 'A senha deve conter' : ''

  if (password.length < 8)
    errors.push(`${message(errors)} no mínimo 8 caracteres`)

  if (!/[A-Z]/.test(password))
    errors.push(`${message(errors)} ao menos uma letra maiúscula`)

  if (!/[a-z]/.test(password))
    errors.push(`${message(errors)} ao menos uma letra minúscula`)

  if (!/[0-9]/.test(password))
    errors.push(`${message(errors)} ao menos um número`)

  if (!/[^A-Za-z0-9]/.test(password))
    errors.push(`${message(errors)} ao menos um caractere especial`)

  if (errors.length > 0) throw new BadRequestError(errors.join(','))
}
