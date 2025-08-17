import { SignOptions } from 'jsonwebtoken'
import { Encrypt } from '../contracts/encrypt'

export type JwtServiceType = typeof import('jsonwebtoken')

export class JwtEncrypt implements Encrypt {
  constructor(private jwtService: JwtServiceType) {}

  generate(
    payload: Record<string, unknown>,
    JWT_SECRET: string,
    { expiresIn }: { expiresIn: SignOptions['expiresIn'] },
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const options: SignOptions = {
        expiresIn,
      }

      this.jwtService.sign(
        payload,
        JWT_SECRET,
        options,
        (err: unknown, token?: string) => {
          if (err || !token) return reject(err)
          resolve(token)
        },
      )
    })
  }

  decode(refreshToken: string): { invalidToken: boolean; sub: string } {
    const decoded = this.jwtService.decode(refreshToken)

    return {
      invalidToken: !decoded,
      sub: decoded?.sub as string,
    }
  }
}
