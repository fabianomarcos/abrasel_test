/* eslint-disable @typescript-eslint/no-explicit-any */
import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*',
})

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export async function middleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: any,
) {
  await runMiddleware(req, res, cors)
  next()
}
