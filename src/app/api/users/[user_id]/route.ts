import { NextRequest } from 'next/server'
import { treatmentResponse } from '@/backend/middlewares/treatment-errors'
import { adminMiddleware as middleware } from '@/backend/middlewares/admin.middleware'
import { UpdateUserController } from '@/backend/modules/users/controllers/update-user.controller'

const updateUserController = UpdateUserController()

export async function PUT(request: NextRequest) {
  const controller = () => updateUserController.update(request)
  return treatmentResponse({ controller, middleware, request })
}
