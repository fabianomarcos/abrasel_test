import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

import { UnauthorizedError } from '../errors/unauthorized'

interface IToken {
  id: string
  sub: string
  role: 'ADMIN' | 'USER'
}

export async function userMiddleware(req: NextRequest) {
  try {
    const authToken = req.headers.get('authorization')
    if (!authToken) throw new UnauthorizedError()

    const tokenPayload = jwt.verify(
      authToken.split(' ')[1],
      process.env.JWT_SECRET ?? '',
    ) as IToken

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(req as any).user = tokenPayload
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError)
      throw new UnauthorizedError('Invalid token', 403)
    throw error
  }
}
