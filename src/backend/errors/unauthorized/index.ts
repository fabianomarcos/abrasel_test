export class UnauthorizedError extends Error {
  status: number

  constructor(message: string = 'Unauthorized', status: number = 401) {
    super(message)
    this.name = 'UnauthorizedError'
    this.status = status
  }
}
