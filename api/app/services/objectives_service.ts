import Objective from '#models/objective'
import User from '#models/user'

export default class ObjectiveService {
  static async getAll(authUser: User): Promise<Objective[]> {
    const addictions = await authUser.related('addictions').query()
    const objectives = []
    for (const addiction of addictions) {
      const addictionObjectives = await addiction.related('objectives').query()
      objectives.push(...addictionObjectives)
    }
    return objectives
  }

  static async getById(id: number, idAddiction: number, authUser: User): Promise<Objective> {
    const addiction = await authUser.related('addictions').query().where('id', idAddiction).first()
    if (!addiction) {
      throw new Error('Addiction not found')
    }
    const objective = await addiction.related('objectives').query().where('id', id).first()
    if (!objective) {
      throw new Error('Objective not found')
    }
    return objective
  }

  static async create(id: number, data: Partial<Objective>, authUser: User): Promise<Objective> {
    const addiction = await authUser.related('addictions').query().where('id', id).first()
    if (!addiction) {
      throw new Error('Addiction not found')
    }
    return await addiction.related('objectives').create(data)
  }

  static async update(
    idAddiction: number,
    id: number,
    data: Partial<Objective>,
    authUser: User
  ): Promise<Objective> {
    const addiction = await authUser.related('addictions').query().where('id', idAddiction).first()
    if (!addiction) {
      throw new Error('Addiction not found')
    }
    const objective = await addiction.related('objectives').query().where('id', id).first()
    if (!objective) {
      throw new Error('Objective not found')
    }
    objective.merge(data)
    await objective.save()
    return objective
  }

  static async delete(idAddiction: number, id: number, authUser: User): Promise<boolean> {
    const addiction = await authUser.related('addictions').query().where('id', idAddiction).first()
    if (!addiction) {
      throw new Error('Addiction not found')
    }
    const objective = await addiction.related('objectives').query().where('id', id).first()
    if (!objective) {
      throw new Error('Objective not found')
    }
    await objective.delete()
    return true
  }
}
