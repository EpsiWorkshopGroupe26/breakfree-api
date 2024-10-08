import type { HttpContext } from '@adonisjs/core/http'
import MentalHealthService from '#services/mental_healths_service'
import { createMentalHealthValidator, updateMentalHealthValidator } from '#validators/mental_health'

export default class MentalHealthsController {
  async getMentalHealths({ auth, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const mentalHealths = await MentalHealthService.getAll(authUser)
    if (!mentalHealths) {
      return response.notFound({ message: 'No mental health records found' })
    }
    return response.ok(mentalHealths)
  }

  async getMentalHealth({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const mentalHealth = await MentalHealthService.getById(params.id, authUser)
    if (!mentalHealth) {
      return response.notFound({ message: 'Mental health record not found' })
    }
    return response.ok(mentalHealth)
  }

  async createMentalHealth({ auth, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(createMentalHealthValidator)
    const mentalHealth = await MentalHealthService.create(authUser, payload)
    return response.created(mentalHealth)
  }

  async updateMentalHealth({ auth, params, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(updateMentalHealthValidator)
    const mentalHealth = await MentalHealthService.update(params.id, payload, authUser)
    if (!mentalHealth) {
      return response.notFound({ message: 'Mental health record not found' })
    }
    return response.ok(mentalHealth)
  }

  async deleteMentalHealth({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const deleted = await MentalHealthService.delete(params.id, authUser)
    if (!deleted) {
      return response.notFound({ message: 'Mental health record not found' })
    }
    return response.noContent()
  }
}
