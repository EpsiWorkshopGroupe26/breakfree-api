import GeneralInformation from '#models/general_information'

export default class GeneralInformationService {
  static async getById(id: number) {
    return GeneralInformation.findOrFail(id)
  }

  static async create(data) {
    return GeneralInformation.create(data)
  }

  static async update(id: number, data) {
    const info = await GeneralInformation.findOrFail(id)
    info.merge(data)
    await info.save()
    return info
  }

  static async delete(id: number) {
    const info = await GeneralInformation.findOrFail(id)
    await info.delete()
  }
}
