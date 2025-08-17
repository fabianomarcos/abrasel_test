import { NextRequest } from 'next/server'
import { treatmentResponse } from '@/backend/middlewares/treatment-errors'
import { CreateUserController } from '@/backend/modules/users/controllers/create-user.controller'
import { ListUsersController } from '@/backend/modules/users/controllers/list-users.controller'
import { adminMiddleware as middleware } from '@/backend/middlewares/admin.middleware'

const listUsersController = ListUsersController()
const createUserController = CreateUserController()

export async function GET(request: NextRequest) {
  const controller = () => listUsersController.listUsers(request)
  return treatmentResponse({ controller, middleware, request })
}

export async function POST(request: NextRequest) {
  const controller = () => createUserController.create(request)
  return treatmentResponse({ controller, request })
}
