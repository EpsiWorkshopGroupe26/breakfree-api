import Motivation from '#models/motivation'
import User from '#models/user'

export default class MotivationService {
  static async getAll(authUser: User): Promise<Motivation[]> {
    return await authUser.related('motivations').query()
  }

  static async getById(id: number, authUser: User): Promise<Motivation | null> {
    return await authUser.related('motivations').query().where('id', id).first()
  }

  static async create(authUser: User, data: Partial<Motivation>): Promise<Motivation> {
    return await authUser.related('motivations').create(data)
  }

  static async update(
    id: number,
    data: Partial<Motivation>,
    authUser: User
  ): Promise<Motivation | null> {
    const motivation = await authUser.related('motivations').query().where('id', id).first()
    if (!motivation) {
      throw new Error('Motivation not found')
    }
    motivation.merge(data)
    await motivation.save()
    return motivation
  }

  static async delete(id: number, authUser: User): Promise<boolean> {
    const motivation = await authUser.related('motivations').query().where('id', id).first()
    if (!motivation) {
      throw new Error('Motivation not found')
    }
    await motivation.delete()
    return true
  }
}
