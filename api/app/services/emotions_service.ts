import Emotion from '#models/emotion'

export default class EmotionService {
  static async getAll() {
    return Emotion.all()
  }

  static async getById(id: number) {
    return Emotion.findOrFail(id)
  }

  static async create(data) {
    return Emotion.create(data)
  }

  static async update(id: number, data) {
    const emotion = await Emotion.findOrFail(id)
    emotion.merge(data)
    await emotion.save()
    return emotion
  }

  static async delete(id: number) {
    const emotion = await Emotion.findOrFail(id)
    await emotion.delete()
  }
}
