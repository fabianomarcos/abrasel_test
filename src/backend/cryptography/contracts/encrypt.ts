import { SignOptions } from 'jsonwebtoken'

export abstract class Encrypt {
  abstract generate(
    payload: Record<string, unknown>,
    JWT_SECRET: string,
    { expiresIn }: { expiresIn: SignOptions['expiresIn'] },
  ): Promise<string>

  abstract decode(refreshToken: string): { invalidToken: boolean; sub: string }
}
