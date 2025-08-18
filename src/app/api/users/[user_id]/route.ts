import { NextRequest } from 'next/server'
import { treatmentResponse } from '@/backend/middlewares/treatment-errors'
import { userMiddleware as middleware } from '@/backend/middlewares/user.middleware'
import { adminMiddleware } from '@/backend/middlewares/admin.middleware'
import { UpdateUserController } from '@/backend/modules/users/controllers/update-user.controller'
import { ListUserByIdController } from '@/backend/modules/users/controllers/list-user-by-id.controller'
import { DeleteUserController } from '@/backend/modules/users/controllers/delete-user.controller'

const deleteUserController = DeleteUserController()
const updateUserController = UpdateUserController()
const listUserController = ListUserByIdController()

export async function PUT(request: NextRequest) {
  const controller = () => updateUserController.update(request)
  return treatmentResponse({ controller, middleware, request })
}

export async function DELETE(request: NextRequest) {
  const controller = () => deleteUserController.delete(request)
  return treatmentResponse({ controller, middleware: adminMiddleware, request })
}

export async function GET(request: NextRequest) {
  const controller = () => listUserController.listUser(request)
  return treatmentResponse({ controller, middleware, request })
}
