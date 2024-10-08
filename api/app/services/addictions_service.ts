import Addiction from '#models/addiction'

export default class AddictionService {
  static async getAll() {
    return Addiction.all()
  }

  static async getById(id: number) {
    return Addiction.findOrFail(id)
  }

  static async create(data) {
    return Addiction.create(data)
  }

  static async update(id: number, data) {
    const addiction = await Addiction.findOrFail(id)
    addiction.merge(data)
    await addiction.save()
    return addiction
  }

  static async delete(id: number) {
    const addiction = await Addiction.findOrFail(id)
    await addiction.delete()
  }
}
