import { hash, compare } from 'bcryptjs'
import { HashCompare } from '../contracts/hash-compare'
import { HashGenerator } from '../contracts/hash-generator'

export class BcryptHash implements HashGenerator, HashCompare {
  private HASH_SALT_LENGTH = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
