import { UpdateUser, User, UserOrm } from '../entities/user.entity'
import { BadRequestError } from '@/backend/errors/bad-request'
import { IUserRepository } from '../repositories/IUserRepository'
import { validatePassword } from '@/backend/pipes/validate-password'
import { HashCompare } from '@/backend/cryptography/contracts/hash-compare'
import { HashGenerator } from '@/backend/cryptography/contracts/hash-generator'

export class UpdateUserUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private hashCompare: HashCompare,
    private hashGeneration: HashGenerator,
  ) {}

  async generateNewPassword(
    currentPassword: string,
    confirmPassword?: string,
    password?: string | null,
  ) {
    if (!confirmPassword && !password) return null
    if ((!confirmPassword && password) || (confirmPassword && !password))
      throw new BadRequestError(
        'To change the password, you must send the current and new passwords',
      )

    const isPasswordValid = await this.hashCompare.compare(
      confirmPassword as string,
      currentPassword as string,
    )

    if (!isPasswordValid) throw new BadRequestError('Credential are not valid.')

    validatePassword(password as string)
    const hashedPassword = await this.hashGeneration.hash(password as string)
    return hashedPassword
  }

  async execute(input: UpdateUser): Promise<User> {
    const existingUser = await this.usersRepository.listByEmail(input.email)
    if (!existingUser) throw new BadRequestError('User not exists')

    const hashedPassword = await this.generateNewPassword(
      existingUser.password as string,
      input.current_password,
      input.password,
    )

    const response = await this.usersRepository.update(
      {
        name: input.name,
        email: input.email,
        password: (hashedPassword || existingUser.password) as string,
      } as UserOrm,
      input.id,
    )

    const user = { ...response, password: null } as User

    return user
  }
}
