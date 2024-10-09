import GeneralInformation from '#models/general_information'
import User from '#models/user'

export default class GeneralInformationService {
  /**
   * Retrieves the general information related to the authenticated user.
   *
   * @param authUser - The authenticated user whose general information is to be retrieved.
   * @returns The general information related to the authenticated user.
   * @throws Error if the general information is not found.
   */
  static async getById(authUser: User) {
    const info = await authUser.related('generalInformation').query().first()
    if (!info) {
      throw new Error('GeneralInformation not found')
    }
    return info
  }

  /**
   * Creates a new GeneralInformation entry related to the authenticated user.
   *
   * @param authUser - The authenticated user who is creating the GeneralInformation entry.
   * @param data - Partial data for the GeneralInformation entry to be created.
   * @returns A promise that resolves to the created GeneralInformation entry.
   */
  static async create(
    authUser: User,
    data: Partial<GeneralInformation>
  ): Promise<GeneralInformation> {
    return await authUser.related('generalInformation').create(data)
  }

  /**
   * Updates a GeneralInformation record with the provided data.
   *
   * @param id - The ID of the GeneralInformation record to update.
   * @param data - A partial object containing the fields to update.
   * @param authUser - The authenticated user performing the update.
   * @returns A promise that resolves to the updated GeneralInformation record.
   * @throws Will throw an error if the GeneralInformation record is not found.
   */
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

  /**
   * Deletes a GeneralInformation record associated with the given ID.
   *
   * @param id - The ID of the GeneralInformation record to delete.
   * @param authUser - The authenticated user performing the deletion.
   * @returns A promise that resolves to true if the deletion was successful.
   * @throws Will throw an error if the GeneralInformation record is not found.
   */
  static async delete(id: number, authUser: User) {
    const info = await authUser.related('generalInformation').query().where('id', id).first()
    if (!info) {
      throw new Error('GeneralInformation not found')
    }
    await info.delete()
    return true
  }
}
