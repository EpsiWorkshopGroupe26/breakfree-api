import GeneralInformation from '#models/general_information'
import User from '#models/user'

export default class GeneralInformationService {
  static async getById(authUser: User) {
    const info = await authUser.related('generalInformation').query().first()
    if (!info) {
      throw new Error('GeneralInformation not found')
    }
    return info
  }

  static async create(
    authUser: User,
    data: Partial<GeneralInformation>
  ): Promise<GeneralInformation> {
    return await authUser.related('generalInformation').create(data)
  }

  static async update(
    id: number,
    data: Partial<GeneralInformation>,
    authUser: User
  ): Promise<GeneralInformation> {
    const info = await authUser.related('generalInformation').query().where('id', id).first()
    if (!info) {
      throw new Error('GeneralInformation not found')
    }
    info.merge(data)
    await info.save()
    return info
  }

  static async delete(id: number, authUser: User) {
    const info = await authUser.related('generalInformation').query().where('id', id).first()
    if (!info) {
      throw new Error('GeneralInformation not found')
    }
    await info.delete()
    return true
  }
}
