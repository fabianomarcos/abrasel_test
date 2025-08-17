import { BadRequestError } from './bad-request'

export class FieldValidator {
  static validateRequiredFields<T extends object>(
    fields: T,
    message?: string,
  ): void {
    const hasEmptyField = Object.entries(fields).some(([, value]) => {
      const str = `${value}`.trim()
      return str === '' || str === 'undefined' || str === 'null'
    })

    if (hasEmptyField) {
      throw new BadRequestError(message || 'Some fields are empty or invalid')
    }
  }
}
