import Addiction from '#models/addiction'
import User from '#models/user'

export default class AddictionService {
  static async getAll(authUser: User): Promise<Addiction[]> {
    return await authUser.related('addictions').query()
  }

  static async getById(id: number, authUser: User): Promise<Addiction | null> {
    return await authUser.related('addictions').query().where('id', id).first()
  }

  static async create(authUser: User, data: Partial<Addiction>): Promise<Addiction> {
    return await authUser.related('addictions').create(data)
  }

  static async update(
    id: number,
    data: Partial<Addiction>,
    authUser: User
  ): Promise<Addiction | null> {
    const addiction = await authUser.related('addictions').query().where('id', id).first()
    if (!addiction) {
      throw new Error('Addiction not found')
    }
    addiction.merge(data)
    await addiction.save()
    return addiction
  }

  static async delete(id: number, authUser: User): Promise<boolean> {
    const addiction = await authUser.related('addictions').query().where('id', id).first()
    if (!addiction) {
      throw new Error('Addiction not found')
    }
    await addiction.delete()
    return true
  }
}
