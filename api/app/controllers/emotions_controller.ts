import type { HttpContext } from '@adonisjs/core/http'
import EmotionService from '#services/emotions_service'
import { createEmotionValidator, updateEmotionValidator } from '#validators/emotion'

export default class EmotionsController {
  async getEmotions({ auth, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const emotions = await EmotionService.getAll(authUser)
    if (!emotions) {
      return response.notFound({ message: 'No emotions found' })
    }
    return response.ok(emotions)
  }

  async getEmotion({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const emotion = await EmotionService.getById(params.id, authUser)
    if (!emotion) {
      return response.notFound({ message: 'Emotion not found' })
    }
    return response.ok(emotion)
  }

  async createEmotion({ auth, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(createEmotionValidator)
    const emotion = await EmotionService.create(authUser, payload)
    return response.created(emotion)
  }

  async updateEmotion({ auth, params, request, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const payload = await request.validateUsing(updateEmotionValidator)
    const emotion = await EmotionService.update(params.id, payload, authUser)
    if (!emotion) {
      return response.notFound({ message: 'Emotion not found' })
    }
    return response.ok(emotion)
  }

  async deleteEmotion({ auth, params, response }: HttpContext): Promise<void> {
    const authUser = auth.getUserOrFail()
    const deleted = await EmotionService.delete(params.id, authUser)
    if (!deleted) {
      return response.notFound({ message: 'Emotion not found' })
    }
    return response.noContent()
  }
}
