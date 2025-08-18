import { NextRequest } from 'next/server'
import { treatmentResponse } from '@/backend/middlewares/treatment-errors'
import { CreateAddressController } from '@/backend/modules/address/controllers/create-address.controller'
import { adminMiddleware as middleware } from '@/backend/middlewares/admin.middleware'

const createAddressController = CreateAddressController()

export async function POST(request: NextRequest) {
  const controller = () => createAddressController.create(request)
  return treatmentResponse({ controller, middleware, request })
}
