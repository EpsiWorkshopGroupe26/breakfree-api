import type { HttpContext } from '@adonisjs/core/http'
import AddictionService from '#services/addictions_service'
import { createAddictionValidator, updateAddictionValidator } from '#validators/addiction'

export default class AddictionsController {
  async getAddictions({ auth, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const addictions = await AddictionService.getAll(authUser)
    if (!addictions) {
      return response.notFound({ message: 'No addictions found' })
    }
    return response.ok(addictions)
  }

  async getAddiction({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const addiction = await AddictionService.getById(params.id, authUser)
    if (!addiction) {
      return response.notFound({ message: 'Addiction not found' })
    }
    return response.ok(addiction)
  }

  async createAddiction({ auth, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(createAddictionValidator)
    const addiction = await AddictionService.create(authUser, payload)
    return response.created(addiction)
  }

  async updateAddiction({ auth, params, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(updateAddictionValidator)
    const addiction = await AddictionService.update(params.id, payload, authUser)
    if (!addiction) {
      return response.notFound({ message: 'Addiction not found' })
    }
    return response.ok(addiction)
  }

  async deleteAddiction({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const deleted = await AddictionService.delete(params.id, authUser)
    if (!deleted) {
      return response.notFound({ message: 'Addiction not found' })
    }
    return response.noContent()
  }
}
