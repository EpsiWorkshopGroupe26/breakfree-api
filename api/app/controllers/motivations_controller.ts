import type { HttpContext } from '@adonisjs/core/http'
import MotivationService from '#services/motivations_service'
import { createMotivationValidator, updateMotivationValidator } from '#validators/motivation'

export default class MotivationsController {
  async getMotivations({ auth, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const motivations = await MotivationService.getAll(authUser)
    if (!motivations) {
      return response.notFound({ message: 'No motivations found' })
    }
    return response.ok(motivations)
  }

  async getMotivation({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const motivation = await MotivationService.getById(params.id, authUser)
    if (!motivation) {
      return response.notFound({ message: 'Motivation not found' })
    }
    return response.ok(motivation)
  }

  async createMotivation({ auth, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(createMotivationValidator)
    const motivation = await MotivationService.create(authUser, payload)
    return response.created(motivation)
  }

  async updateMotivation({ auth, params, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(updateMotivationValidator)
    const motivation = await MotivationService.update(params.id, payload, authUser)
    if (!motivation) {
      return response.notFound({ message: 'Motivation not found' })
    }
    return response.ok(motivation)
  }

  async deleteMotivation({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const deleted = await MotivationService.delete(params.id, authUser)
    if (!deleted) {
      return response.notFound({ message: 'Motivation not found' })
    }
    return response.noContent()
  }
}
