import type { HttpContext } from '@adonisjs/core/http'
import GeneralInformationService from '#services/general_information_service'
import {
  createGeneralInformationValidator,
  updateGeneralInformationValidator,
} from '#validators/general_information'

export default class GeneralInformationsController {
  async getUserInfo({ auth, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const userInfo = await GeneralInformationService.getByUserId(authUser)
    if (!userInfo) {
      return response.notFound({ message: 'User information not found' })
    }
    return response.ok(userInfo)
  }

  async createUserInfo({ auth, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(createGeneralInformationValidator)
    const userInfo = await GeneralInformationService.create(authUser, payload)
    return response.created(userInfo)
  }

  async updateUserInfo({ auth, params, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(updateGeneralInformationValidator)
    const userInfo = await GeneralInformationService.update(params.id, payload, authUser)
    if (!userInfo) {
      return response.notFound({ message: 'User information not found' })
    }
    return response.ok(userInfo)
  }

  async deleteUserInfo({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const deleted = await GeneralInformationService.delete(params.id, authUser)
    if (!deleted) {
      return response.notFound({ message: 'User information not found' })
    }
    return response.noContent()
  }
}
