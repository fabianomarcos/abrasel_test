export class Tokens {
  user_id!: string
  expires_date!: Date
  created_at?: Date
  updated_at?: Date
}

export type ICreateToken = Omit<Tokens, 'id' | 'created_at' | 'updated_at'>
