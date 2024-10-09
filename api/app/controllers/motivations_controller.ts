import type { HttpContext } from '@adonisjs/core/http'
import MotivationService from '#services/motivations_service'
import { createMotivationValidator, updateMotivationValidator } from '#validators/motivation'

export default class MotivationsController {
  /**
   * Retrieves all motivations for the authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing the authentication and response objects.
   * @returns {Promise<void>} A promise that resolves to void.
   *
   * @throws {Error} If the user is not authenticated or if there is an issue retrieving motivations.
   */
  async getMotivations({ auth, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const motivations = await MotivationService.getAll(authUser)
    if (!motivations) {
      return response.notFound({ message: 'No motivations found' })
    }
    return response.ok(motivations)
  }

  /**
   * Retrieves a motivation by its ID for the authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, parameters, and response objects.
   * @returns {Promise<void>} - A promise that resolves to void.
   *
   * @throws {Error} - Throws an error if the user is not authenticated or if the motivation is not found.
   */
  async getMotivation({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const motivation = await MotivationService.getById(params.id, authUser)
    if (!motivation) {
      return response.notFound({ message: 'Motivation not found' })
    }
    return response.ok(motivation)
  }

  /**
   * Handles the creation of a new motivation.
   *
   * @param {HttpContext} context - The HTTP context containing the authentication, request, and response objects.
   * @returns {Promise<void>} - A promise that resolves when the motivation is successfully created.
   *
   * @throws {AuthenticationException} - If the user is not authenticated.
   * @throws {ValidationException} - If the request payload fails validation.
   * @throws {Error} - If there is an error during the creation of the motivation.
   */
  async createMotivation({ auth, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(createMotivationValidator)
    const motivation = await MotivationService.create(authUser, payload)
    return response.created(motivation)
  }

  /**
   * Updates a motivation entry based on the provided parameters.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, request, and response objects.
   * @returns {Promise<void>} - A promise that resolves to void.
   *
   * @throws {AuthenticationException} - If the user is not authenticated.
   * @throws {ValidationException} - If the request payload validation fails.
   * @throws {NotFoundException} - If the motivation entry is not found.
   */
  async updateMotivation({ auth, params, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(updateMotivationValidator)
    const motivation = await MotivationService.update(params.id, payload, authUser)
    if (!motivation) {
      return response.notFound({ message: 'Motivation not found' })
    }
    return response.ok(motivation)
  }

  /**
   * Deletes a motivation entry based on the provided ID.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, parameters, and response objects.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   *
   * @throws {Error} - Throws an error if the user is not authenticated.
   *
   * @remarks
   * This method uses the `MotivationService` to delete the motivation entry. If the entry is not found,
   * it returns a 404 Not Found response. Otherwise, it returns a 200 OK response indicating successful deletion.
   */
  async deleteMotivation({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const deleted = await MotivationService.delete(params.id, authUser)
    if (!deleted) {
      return response.notFound({ message: 'Motivation not found' })
    }
    return response.ok({ message: 'Motivation deleted successfully' })
  }
}
