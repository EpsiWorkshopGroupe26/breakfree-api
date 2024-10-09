import type { HttpContext } from '@adonisjs/core/http'
import ObjectiveService from '#services/objectives_service'
import { createObjectiveValidator, updateObjectiveValidator } from '#validators/objective'
import Objective from '#models/objective'

export default class ObjectivesController {
  /**
   * Retrieves all objectives for the authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing authentication and response objects.
   * @returns {Promise<void>} - A promise that resolves to void.
   *
   * @throws {Error} - Throws an error if the user is not authenticated.
   */
  async getObjectives({ auth, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const objectives = await ObjectiveService.getAll(authUser)
    if (!objectives) {
      return response.notFound({ message: 'No objectives found' })
    }
    return response.ok(objectives)
  }

  /**
   * Retrieves an objective based on the provided parameters.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, parameters, and response objects.
   * @returns {Promise<void>} - A promise that resolves to void.
   *
   * @throws {Error} - Throws an error if the user is not authenticated.
   * @throws {Error} - Throws an error if the objective is not found.
   */
  async getObjective({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const objective = await ObjectiveService.getById(params.id, params.idAddiction, authUser)
    if (!objective) {
      return response.notFound({ message: 'Objective not found' })
    }
    return response.ok(objective)
  }

  /**
   * Creates a new objective.
   *
   * @param {HttpContext} context - The HTTP context object containing the request, response, authentication, and route parameters.
   * @returns {Promise<void>} - A promise that resolves when the objective is created.
   *
   * @throws {AuthenticationException} - If the user is not authenticated.
   * @throws {ValidationException} - If the request payload fails validation.
   * @throws {Error} - If there is an error during the creation of the objective.
   */
  async createObjective({ auth, request, response, params }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = (await request.validateUsing(createObjectiveValidator)) as Partial<Objective>
    const objective = await ObjectiveService.create(params.id, payload, authUser)
    return response.created(objective)
  }

  /**
   * Updates an existing objective based on the provided parameters and request payload.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, parameters, request, and response objects.
   * @returns {Promise<void>} A promise that resolves when the objective is updated.
   *
   * @throws {AuthenticationException} If the user is not authenticated.
   * @throws {ValidationException} If the request payload validation fails.
   * @throws {NotFoundException} If the objective is not found.
   */
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

  /**
   * Deletes an objective based on the provided addiction ID and objective ID.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, parameters, and response objects.
   * @returns {Promise<void>} - A promise that resolves to void.
   *
   * @throws {Error} - Throws an error if the user is not authenticated.
   *
   * @remarks
   * This method uses the ObjectiveService to delete the objective. If the objective is not found,
   * it returns a 404 Not Found response. Otherwise, it returns a 200 OK response indicating
   * successful deletion.
   */
  async deleteObjective({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const deleted = await ObjectiveService.delete(params.idAddiction, params.id, authUser)
    if (!deleted) {
      return response.notFound({ message: 'Objective not found' })
    }
    return response.ok({ message: 'Objective deleted successfully' })
  }
}
