import type { HttpContext } from '@adonisjs/core/http'
import ObjectiveService from '#services/objectives_service'
import { createObjectiveValidator, updateObjectiveValidator } from '#validators/objective'
import Objective from '#models/objective'

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
    const objective = await ObjectiveService.getById(params.id, params.idAddiction, authUser)
    if (!objective) {
      return response.notFound({ message: 'Objective not found' })
    }
    return response.ok(objective)
  }

  async createObjective({ auth, request, response, params }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = (await request.validateUsing(createObjectiveValidator)) as Partial<Objective>
    const objective = await ObjectiveService.create(params.id, payload, authUser)
    return response.created(objective)
  }

  async updateObjective({ auth, params, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = (await request.validateUsing(updateObjectiveValidator)) as Partial<Objective>
    const objective = await ObjectiveService.update(
      params.idAddiction,
      params.id,
      payload,
      authUser
    )
    if (!objective) {
      return response.notFound({ message: 'Objective not found' })
    }
    return response.ok(objective)
  }

  async deleteObjective({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const deleted = await ObjectiveService.delete(params.idAddiction, params.id, authUser)
    if (!deleted) {
      return response.notFound({ message: 'Objective not found' })
    }
    return response.ok({ message: 'Objective deleted successfully' })
  }
}
