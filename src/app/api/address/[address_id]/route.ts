import { NextRequest } from 'next/server'
import { treatmentResponse } from '@/backend/middlewares/treatment-errors'
import { userMiddleware as middleware } from '@/backend/middlewares/user.middleware'
import { UpdateAddressController } from '@/backend/modules/address/controllers/update-address.controller'

const updateAddressController = UpdateAddressController()

export async function PUT(request: NextRequest) {
  const controller = () => updateAddressController.update(request)
  return treatmentResponse({ controller, middleware, request })
}
