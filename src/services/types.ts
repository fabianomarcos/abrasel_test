export type ResponseType<T, E = IError> = [T | null, E | null]

export interface IError extends Error {
  response: { data: { error: string } }
}
