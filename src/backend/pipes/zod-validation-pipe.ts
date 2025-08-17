import { ZodError, ZodType } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { BadRequestError } from '../errors/bad-request'

export function validateWithPipe<T>(schema: ZodType<T>, data: unknown): T {
  try {
    return schema.parse(data)
  } catch (error) {
    throw error instanceof ZodError
      ? new BadRequestError(
          `Validation failed: ${fromZodError(error as ZodError).message}`,
        )
      : new BadRequestError('Invalid data format')
  }
}
