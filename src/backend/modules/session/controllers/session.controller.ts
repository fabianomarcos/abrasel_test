import * as jsonwebtoken from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

import { SessionUseCase } from '../use-cases/session.usecase'
import { UsersRepository } from '../../users/repositories/users.repository'
import { JwtEncrypt } from '@/backend/cryptography/implementations/jwt-encrypt'
import { BcryptHash } from '@/backend/cryptography/implementations/bcrypt-hash'

class Controller {
  constructor(private authenticateUsecase: SessionUseCase) {}

  async create(request: NextRequest): Promise<NextResponse> {
    const { email, password } = await request.json()
    const session = await this.authenticateUsecase.execute({ email, password })
    return NextResponse.json(session)
  }
}

export function CreateSessionController() {
  const encrypt = new JwtEncrypt(jsonwebtoken)
  const userRepository = new UsersRepository()
  const hashCompare = new BcryptHash()
  const authenticateUsecase = new SessionUseCase(
    userRepository,
    hashCompare,
    encrypt,
  )
  return new Controller(authenticateUsecase)
}
