import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

import { UnauthorizedError } from '../errors/unauthorized'

interface IToken {
  id: string
  sub: string
  role: 'ADMIN' | 'USER'
}

export async function adminMiddleware(req: NextRequest) {
  try {
    const authToken = req.headers.get('authorization')
    if (!authToken) throw new UnauthorizedError()

    const tokenPayload = jwt.verify(
      authToken.split(' ')[1],
      process.env.JWT_SECRET ?? '',
    ) as IToken

    if (!tokenPayload || tokenPayload.role !== 'ADMIN')
      throw new UnauthorizedError('Not authorized', 403)
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError)
      throw new UnauthorizedError('Invalid token', 403)
    throw error
  }
}
