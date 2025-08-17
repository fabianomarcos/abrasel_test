import { CreateSessionController } from '@/backend/modules/session/controllers/session.controller'
import { treatmentResponse } from '@/backend/middlewares/treatment-errors'
import { NextRequest } from 'next/server'

const createSessionController = CreateSessionController()

export async function POST(request: NextRequest) {
  const controller = () => createSessionController.create(request)
  return treatmentResponse({ controller, request })
}
