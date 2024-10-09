import type { HttpContext } from '@adonisjs/core/http'
import EmotionService from '#services/emotions_service'
import { createEmotionValidator, updateEmotionValidator } from '#validators/emotion'

export default class EmotionsController {
  /**
   * Retrieves all emotions for the authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing authentication and response objects.
   * @returns {Promise<void>} - A promise that resolves to void.
   *
   * @throws {Error} - Throws an error if the user is not authenticated.
   * @throws {Error} - Throws an error if there are no emotions found.
   */
  async getEmotions({ auth, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const emotions = await EmotionService.getAll(authUser)
    if (!emotions) {
      return response.notFound({ message: 'No emotions found' })
    }
    return response.ok(emotions)
  }

  /**
   * Retrieves an emotion by its ID for the authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, parameters, and response objects.
   * @returns {Promise<void>} - A promise that resolves to void.
   *
   * @throws {AuthenticationException} - If the user is not authenticated.
   * @throws {NotFoundException} - If the emotion is not found.
   */
  async getEmotion({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const emotion = await EmotionService.getById(params.id, authUser)
    if (!emotion) {
      return response.notFound({ message: 'Emotion not found' })
    }
    return response.ok(emotion)
  }

  /**
   * Handles the creation of a new emotion.
   *
   * @param {HttpContext} context - The HTTP context containing the authentication, request, and response objects.
   * @returns {Promise<void>} A promise that resolves when the emotion is successfully created.
   *
   * @throws {AuthenticationException} If the user is not authenticated.
   * @throws {ValidationException} If the request payload fails validation.
   */
  async createEmotion({ auth, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(createEmotionValidator)
    const emotion = await EmotionService.create(authUser, payload)
    return response.created(emotion)
  }

  /**
   * Updates an emotion record based on the provided parameters.
   *
   * @param {HttpContext} context - The HTTP context containing the authentication, parameters, request, and response objects.
   * @returns {Promise<void>} - A promise that resolves to void.
   *
   * @throws {AuthenticationException} - If the user is not authenticated.
   * @throws {ValidationException} - If the request payload validation fails.
   * @throws {NotFoundException} - If the emotion record is not found.
   */
  async updateEmotion({ auth, params, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(updateEmotionValidator)
    const emotion = await EmotionService.update(params.id, payload, authUser)
    if (!emotion) {
      return response.notFound({ message: 'Emotion not found' })
    }
    return response.ok(emotion)
  }

  /**
   * Deletes an emotion based on the provided ID and authenticated user.
   *
   * @param {HttpContext} context - The HTTP context containing authentication, parameters, and response objects.
   * @returns {Promise<void>} - A promise that resolves when the emotion is deleted or an appropriate response is sent.
   *
   * @throws {Error} - Throws an error if the user is not authenticated.
   */
  async deleteEmotion({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const deleted = await EmotionService.delete(params.id, authUser)
    if (!deleted) {
      return response.notFound({ message: 'Emotion not found' })
    }
    return response.ok({ message: 'Emotion deleted successfully' })
  }
}
