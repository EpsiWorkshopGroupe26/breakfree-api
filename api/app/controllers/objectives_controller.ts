import type { HttpContext } from '@adonisjs/core/http'
import ObjectiveService from '#services/objectives_service'
import { createObjectiveValidator, updateObjectiveValidator } from '#validators/objective'

export default class ObjectivesController {
  async getObjectives({ auth, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const objectives = await ObjectiveService.getAll(authUser)
    if (!objectives) {
      return response.notFound({ message: 'No objectives found' })
    }
    return response.ok(objectives)
  }

  async getObjective({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const objective = await ObjectiveService.getById(params.id, authUser)
    if (!objective) {
      return response.notFound({ message: 'Objective not found' })
    }
    return response.ok(objective)
  }

  async createObjective({ auth, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(createObjectiveValidator)
    const objective = await ObjectiveService.create(payload, authUser)
    return response.created(objective)
  }

  async updateObjective({ auth, params, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(updateObjectiveValidator)
    const objective = await ObjectiveService.update(params.id, payload, authUser)
    if (!objective) {
      return response.notFound({ message: 'Objective not found' })
    }
    return response.ok(objective)
  }

  async deleteObjective({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const deleted = await ObjectiveService.delete(params.id, authUser)
    if (!deleted) {
      return response.notFound({ message: 'Objective not found' })
    }
    return response.noContent()
  }
}
