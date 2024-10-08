import MentalHealth from '#models/mental_health'

export default class MentalHealthService {
  static async getAll() {
    return MentalHealth.all()
  }

  static async getById(id: number) {
    return MentalHealth.findOrFail(id)
  }

  static async create(data) {
    return MentalHealth.create(data)
  }

  static async update(id: number, data) {
    const health = await MentalHealth.findOrFail(id)
    health.merge(data)
    await health.save()
    return health
  }

  static async delete(id: number) {
    const health = await MentalHealth.findOrFail(id)
    await health.delete()
  }
}

