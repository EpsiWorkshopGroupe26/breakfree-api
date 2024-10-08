import MentalHealth from '#models/mental_health'
import User from '#models/user'

export default class MentalHealthService {
  static async getAll(authUser: User): Promise<MentalHealth[]> {
    return await authUser.related('mentalHealths').query()
  }

  static async getById(id: number, authUser: User): Promise<MentalHealth | null> {
    return await authUser.related('mentalHealths').query().where('id', id).first()
  }

  static async create(authUser: User, data: Partial<MentalHealth>): Promise<MentalHealth> {
    return await authUser.related('mentalHealths').create(data)
  }

  static async update(
    id: number,
    data: Partial<MentalHealth>,
    authUser: User
  ): Promise<MentalHealth | null> {
    const health = await authUser.related('mentalHealths').query().where('id', id).first()
    if (!health) {
      return null
    }
    health.merge(data)
    await health.save()
    return health
  }

  static async delete(id: number, authUser: User): Promise<boolean> {
    const health = await authUser.related('mentalHealths').query().where('id', id).first()
    if (!health) {
      return false
    }
    await health.delete()
    return true
  }
}
