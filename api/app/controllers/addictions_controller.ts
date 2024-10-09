import type { HttpContext } from '@adonisjs/core/http'
import AddictionService from '#services/addictions_service'
import { createAddictionValidator, updateAddictionValidator } from '#validators/addiction'

export default class AddictionsController {
  /**
   * Retrieves all addictions for the authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing authentication and response objects.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async getAddictions({ auth, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const addictions = await AddictionService.getAll(authUser)
    if (!addictions) {
      return response.notFound({ message: 'No addictions found' })
    }
    return response.ok(addictions)
  }

  /**
   * Retrieves a specific addiction by its ID for the authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, parameters, and response objects.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async getAddiction({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const addiction = await AddictionService.getById(params.id, authUser)
    if (!addiction) {
      return response.notFound({ message: 'Addiction not found' })
    }
    return response.ok(addiction)
  }

  /**
   * Creates a new addiction for the authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, request, and response objects.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async createAddiction({ auth, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(createAddictionValidator)
    const addiction = await AddictionService.create(authUser, payload)
    return response.created(addiction)
  }

  /**
   * Updates an existing addiction by its ID for the authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, parameters, request, and response objects.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async updateAddiction({ auth, params, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(updateAddictionValidator)
    const addiction = await AddictionService.update(params.id, payload, authUser)
    if (!addiction) {
      return response.notFound({ message: 'Addiction not found' })
    }
    return response.ok(addiction)
  }

  /**
   * Deletes an addiction by its ID for the authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, parameters, and response objects.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async deleteAddiction({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const deleted = await AddictionService.delete(params.id, authUser)
    if (!deleted) {
      return response.notFound({ message: 'Addiction not found' })
    }
    return response.noContent()
  }
}
