import Objective from '#models/objective'

export default class ObjectiveService {
  static async getAll() {
    return Objective.all()
  }

  static async getById(id: number) {
    return Objective.findOrFail(id)
  }

  static async create(data) {
    return Objective.create(data)
  }

  static async update(id: number, data) {
    const objective = await Objective.findOrFail(id)
    objective.merge(data)
    await objective.save()
    return objective
  }

  static async delete(id: number) {
    const objective = await Objective.findOrFail(id)
    await objective.delete()
  }
}
