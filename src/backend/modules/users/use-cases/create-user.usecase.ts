import { HashGenerator } from '@/backend/cryptography/contracts/hash-generator'
import { User, UserOrm } from '../entities/user.entity'
import { IUserRepository } from '../repositories/IUserRepository'
import { BadRequestError } from '@/backend/errors/bad-request'
import { validatePassword } from '@/backend/pipes/validate-password'
import { FieldValidator } from '@/backend/errors/field-validator'

export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: IUserRepository,
    private hashGeneration: HashGenerator,
  ) {}

  async execute(input: UserOrm): Promise<User> {
    const { email, role, name, password } = input
    FieldValidator.validateRequiredFields({ email, role, name, password })

    const existingUser = await this.usersRepository.listByEmail(input.email)
    if (existingUser) throw new BadRequestError('User already exists')

    validatePassword(input.password)

    const hashedPassword = await this.hashGeneration.hash(input.password)

    const response = await this.usersRepository.create({
      ...input,
      password: hashedPassword,
    })

    const user = { ...response, password: null } as User

    return user
  }
}
