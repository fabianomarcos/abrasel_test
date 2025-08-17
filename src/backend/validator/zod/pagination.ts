import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.string().min(1),
  perPage: z.string().min(1),
})
