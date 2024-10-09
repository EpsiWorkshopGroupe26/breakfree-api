import type { HttpContext } from '@adonisjs/core/http'
import GeneralInformationService from '#services/general_information_service'
import {
  createGeneralInformationValidator,
  updateGeneralInformationValidator,
} from '#validators/general_information'

export default class GeneralInformationsController {
  /**
   * Retrieves user information based on the authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing authentication and response objects.
   * @returns {Promise<void>} - A promise that resolves to void.
   *
   * @throws {Error} - Throws an error if the user information is not found.
   */
  async getUserInfo({ auth, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const userInfo = await GeneralInformationService.getById(authUser)
    if (!userInfo) {
      return response.notFound({ message: 'User information not found' })
    }
    return response.ok(userInfo)
  }

  /**
   * Creates user information.
   *
   * @param {HttpContext} context - The HTTP context containing the authentication, request, and response objects.
   * @returns {Promise<void>} - A promise that resolves when the user information is created.
   *
   * @throws {AuthenticationException} - If the user is not authenticated.
   * @throws {ValidationException} - If the request payload validation fails.
   *
   * This method performs the following steps:
   * 1. Retrieves the authenticated user.
   * 2. Validates the request payload using the `createGeneralInformationValidator`.
   * 3. Creates the user information using the `GeneralInformationService`.
   * 4. Returns a response with the created user information.
   */
  async createUserInfo({ auth, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(createGeneralInformationValidator)
    const userInfo = await GeneralInformationService.create(authUser, payload)
    return response.created(userInfo)
  }

  /**
   * Updates the general information of a user.
   *
   * @param {HttpContext} context - The HTTP context object containing the request, response, and other relevant data.
   * @returns {Promise<void>} A promise that resolves when the user information is updated.
   *
   * @throws {Error} If the user is not authenticated or if the user information is not found.
   */
  async updateUserInfo({ auth, params, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(updateGeneralInformationValidator)
    const userInfo = await GeneralInformationService.update(params.id, payload, authUser)
    if (!userInfo) {
      return response.notFound({ message: 'User information not found' })
    }
    return response.ok(userInfo)
  }

  /**
   * Deletes user information based on the provided ID.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, parameters, and response objects.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   *
   * @throws {Error} - Throws an error if the user is not authenticated.
   *
   * @remarks
   * This method uses the `GeneralInformationService` to delete the user information.
   * If the information is not found, it responds with a 404 status and a message indicating that the user information was not found.
   * If the deletion is successful, it responds with a 200 status and a message indicating that the user information was deleted successfully.
   */
  async deleteUserInfo({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const deleted = await GeneralInformationService.delete(params.id, authUser)
    if (!deleted) {
      return response.notFound({ message: 'User information not found' })
    }
    return response.ok({ message: 'User information deleted successfully' })
  }
}
