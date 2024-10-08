import Motivation from '#models/motivation'

export default class MotivationService {
  static async getAll() {
    return Motivation.all()
  }

  static async getById(id: number) {
    return Motivation.findOrFail(id)
  }

  static async create(data) {
    return Motivation.create(data)
  }

  static async update(id: number, data) {
    const motivation = await Motivation.findOrFail(id)
    motivation.merge(data)
    await motivation.save()
    return motivation
  }

  static async delete(id: number) {
    const motivation = await Motivation.findOrFail(id)
    await motivation.delete()
  }
}

