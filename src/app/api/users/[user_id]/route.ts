import { NextRequest } from 'next/server'
import { treatmentResponse } from '@/backend/middlewares/treatment-errors'
import { adminMiddleware as middleware } from '@/backend/middlewares/admin.middleware'
import { UpdateUserController } from '@/backend/modules/users/controllers/update-user.controller'
import { ListUserByIdController } from '@/backend/modules/users/controllers/list-user-by-id.controller'

const updateUserController = UpdateUserController()
const listUserController = ListUserByIdController()

export async function PUT(request: NextRequest) {
  const controller = () => updateUserController.update(request)
  return treatmentResponse({ controller, middleware, request })
}

export async function GET(request: NextRequest) {
  const controller = () => listUserController.listUser(request)
  return treatmentResponse({ controller, middleware, request })
}
