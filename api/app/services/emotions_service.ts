import Emotion from '#models/emotion'
import User from '#models/user'

export default class EmotionService {
  static async getAll(authUser: User): Promise<Emotion[]> {
    return await authUser.related('emotions').query()
  }

  static async getById(id: number, authUser: User): Promise<Emotion | null> {
    return await authUser.related('emotions').query().where('id', id).first()
  }

  static async create(authUser: User, data: Partial<Emotion>): Promise<Emotion> {
    return await authUser.related('emotions').create(data)
  }

  static async update(id: number, data: Partial<Emotion>, authUser: User) {
    const emotion = await authUser.related('emotions').query().where('id', id).first()
    if (!emotion) {
      throw new Error('Emotion not found')
    }
    emotion.merge(data)
    await emotion.save()
    return emotion
  }

  static async delete(id: number, authUser: User) {
    const emotion = await authUser.related('emotions').query().where('id', id).first()
    if (!emotion) {
      throw new Error('Emotion not found')
    }
    await emotion.delete()
    return true
  }
}
