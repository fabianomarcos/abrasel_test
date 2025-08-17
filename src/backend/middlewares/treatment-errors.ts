import { NextResponse, NextRequest } from 'next/server'
import { IError } from '../interfaces'

type MiddlewareType = (request: NextRequest) => Promise<void>

export const treatmentResponse = async ({
  controller,
  middleware = null,
  request,
}: {
  middleware?: MiddlewareType | null
  controller: (
    req: NextRequest,
    rest?: unknown,
  ) => Promise<NextResponse<unknown>>
  request: NextRequest
}) => {
  try {
    if (middleware) await middleware(request)
    return await controller(request)
  } catch (err) {
    return catchAppError(err)
  }
}

export const catchAppError = (err: unknown) => {
  const error = err as IError
  const statusCode = error.statusCode || error.status || 500
  const errorMessage = error.message || 'Internal server error'
  return NextResponse.json(
    { error: errorMessage, status: statusCode },
    { status: statusCode },
  )
}
