import Addiction from '#models/addiction'
import User from '#models/user'

export default class AddictionService {
  /**
   * Retrieves all addictions related to the authenticated user.
   *
   * @param authUser - The authenticated user whose addictions are to be retrieved.
   * @returns A promise that resolves to an array of addictions.
   */
  static async getAll(authUser: User): Promise<Addiction[]> {
    return await authUser.related('addictions').query()
  }

  /**
   * Retrieves an addiction by its ID for the authenticated user.
   *
   * @param id - The ID of the addiction to retrieve.
   * @param authUser - The authenticated user whose addiction is being retrieved.
   * @returns A promise that resolves to the addiction if found, or null if not found.
   */
  static async getById(id: number, authUser: User): Promise<Addiction | null> {
    return await authUser.related('addictions').query().where('id', id).first()
  }

  /**
   * Creates a new addiction record associated with the authenticated user.
   *
   * @param authUser - The authenticated user who is creating the addiction.
   * @param data - Partial data for the new addiction record.
   * @returns A promise that resolves to the created addiction record.
   */
  static async create(authUser: User, data: Partial<Addiction>): Promise<Addiction> {
    return await authUser.related('addictions').create(data)
  }

  /**
   * Updates an existing addiction record with the provided data.
   *
   * @param id - The ID of the addiction to update.
   * @param data - A partial object containing the fields to update in the addiction.
   * @param authUser - The authenticated user performing the update.
   * @returns A promise that resolves to the updated addiction or null if not found.
   * @throws An error if the addiction is not found.
   */
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

  /**
   * Deletes an addiction record associated with the authenticated user.
   *
   * @param id - The ID of the addiction to be deleted.
   * @param authUser - The authenticated user performing the deletion.
   * @returns A promise that resolves to `true` if the deletion was successful.
   * @throws An error if the addiction is not found.
   */
  static async delete(id: number, authUser: User): Promise<boolean> {
    const addiction = await authUser.related('addictions').query().where('id', id).first()
    if (!addiction) {
      throw new Error('Addiction not found')
    }
    await addiction.delete()
    return true
  }
}
