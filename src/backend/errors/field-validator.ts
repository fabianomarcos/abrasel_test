import { BadRequestError } from './bad-request'

export class FieldValidator {
  static validateRequiredFields<T extends object>(
    fields: T,
    message?: string,
  ): void {
    const errors: string[] = []
    Object.entries(fields).forEach(([item, value]) => {
      const str = `${value}`.trim()
      const emptyField = str === '' || str === 'undefined' || str === 'null'
      if (emptyField) errors.push(item)
    })

    if (errors.length === 0) return
    throw new BadRequestError(
      message || `Some fields are invalids: ${errors.join(', ')}`,
    )
  }
}
