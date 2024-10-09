import type { HttpContext } from '@adonisjs/core/http'
import MentalHealthService from '#services/mental_healths_service'
import { createMentalHealthValidator, updateMentalHealthValidator } from '#validators/mental_health'

export default class MentalHealthsController {
  /**
   * Retrieves all mental health records for the authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing the authentication and response objects.
   * @returns {Promise<void>} - A promise that resolves to void.
   *
   * @throws {Error} - Throws an error if the user is not authenticated.
   *
   * @remarks
   * This method uses the `MentalHealthService` to fetch all mental health records associated with the authenticated user.
   * If no records are found, it returns a 404 Not Found response with a message indicating that no mental health records were found.
   * Otherwise, it returns a 200 OK response with the retrieved mental health records.
   */
  async getMentalHealths({ auth, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const mentalHealths = await MentalHealthService.getAll(authUser)
    if (!mentalHealths) {
      return response.notFound({ message: 'No mental health records found' })
    }
    return response.ok(mentalHealths)
  }

  /**
   * Retrieves a mental health record by its ID for the authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, parameters, and response objects.
   * @param {Auth} context.auth - The authentication object to get the authenticated user.
   * @param {Params} context.params - The parameters object containing the ID of the mental health record.
   * @param {Response} context.response - The response object to send the HTTP response.
   *
   * @returns {Promise<void>} - A promise that resolves to void.
   *
   * @throws {Error} - Throws an error if the user is not authenticated or if the mental health record is not found.
   */
  async getMentalHealth({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const mentalHealth = await MentalHealthService.getById(params.id, authUser)
    if (!mentalHealth) {
      return response.notFound({ message: 'Mental health record not found' })
    }
    return response.ok(mentalHealth)
  }

  /**
   * Creates a new mental health record.
   *
   * @param {HttpContext} context - The HTTP context containing the authentication, request, and response objects.
   * @returns {Promise<void>} A promise that resolves when the mental health record is created.
   *
   * @throws {AuthenticationException} If the user is not authenticated.
   * @throws {ValidationException} If the request payload fails validation.
   * @throws {Error} If there is an error during the creation of the mental health record.
   */
  async createMentalHealth({ auth, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(createMentalHealthValidator)
    const mentalHealth = await MentalHealthService.create(authUser, payload)
    return response.created(mentalHealth)
  }

  /**
   * Updates a mental health record.
   *
   * @param {HttpContext} context - The HTTP context object containing the request, response, authentication, and parameters.
   * @returns {Promise<void>} - A promise that resolves when the update operation is complete.
   *
   * @throws {Error} - Throws an error if the user is not authenticated or if the validation fails.
   *
   * The function performs the following steps:
   * 1. Retrieves the authenticated user.
   * 2. Validates the request payload using the `updateMentalHealthValidator`.
   * 3. Attempts to update the mental health record with the provided ID and payload.
   * 4. If the mental health record is not found, returns a 404 Not Found response.
   * 5. If the update is successful, returns a 200 OK response with the updated mental health record.
   */
  async updateMentalHealth({ auth, params, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(updateMentalHealthValidator)
    const mentalHealth = await MentalHealthService.update(params.id, payload, authUser)
    if (!mentalHealth) {
      return response.notFound({ message: 'Mental health record not found' })
    }
    return response.ok(mentalHealth)
  }

  /**
   * Deletes a mental health record based on the provided ID.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, parameters, and response objects.
   * @returns {Promise<void>} - A promise that resolves to void.
   *
   * @throws {Error} - Throws an error if the user is not authenticated.
   *
   * @remarks
   * This method uses the `MentalHealthService` to delete the mental health record.
   * If the record is not found, it returns a 404 response with a message indicating that the record was not found.
   * If the deletion is successful, it returns a 200 response with a success message.
   */
  async deleteMentalHealth({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const deleted = await MentalHealthService.delete(params.id, authUser)
    if (!deleted) {
      return response.notFound({ message: 'Mental health record not found' })
    }
    return response.ok({ message: 'Mental health record deleted successfully' })
  }
}
