import { CONFIG } from '@/config'
import { Login } from '../entities/login.entity'
import { User } from '../../users/entities/user.entity'
import { BadRequestError } from '@/backend/errors/bad-request'
import { FieldValidator } from '@/backend/errors/field-validator'
import { Encrypt } from '@/backend/cryptography/contracts/encrypt'
import { IUserRepository } from '../../users/repositories/IUserRepository'
import { HashCompare } from '@/backend/cryptography/contracts/hash-compare'

const JWT_SECRET = CONFIG.JWT_SECRET || ''

type SessionUseCaseOutput = {
  access_token: string
  user: User
}

export class SessionUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashCompare: HashCompare,
    private encrypt: Encrypt,
  ) {}

  async execute({ email, password }: Login): Promise<SessionUseCaseOutput> {
    FieldValidator.validateRequiredFields({ email, password })
    const userExists = await this.userRepository.listByEmail(email)
    const user = { ...userExists, password: '' } as User
    if (!userExists) throw new BadRequestError('Credential are not valid.')

    const isPasswordValid = await this.hashCompare.compare(
      password,
      userExists.password as string,
    )

    if (!isPasswordValid) throw new BadRequestError('Credential are not valid.')

    const access_token = await this.encrypt.generate(
      { sub: userExists.id, role: userExists.role },
      JWT_SECRET,
      { expiresIn: '1d' },
    )

    return {
      access_token,
      user,
    }
  }
}
