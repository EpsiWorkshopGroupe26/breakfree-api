import Motivation from '#models/motivation'
import User from '#models/user'

export default class MotivationService {
  /**
   * Retrieves all motivations related to the authenticated user.
   *
   * @param authUser - The authenticated user whose motivations are to be retrieved.
   * @returns A promise that resolves to an array of motivations.
   */
  static async getAll(authUser: User): Promise<Motivation[]> {
    return await authUser.related('motivations').query()
  }

  /**
   * Retrieves a motivation by its ID for the authenticated user.
   *
   * @param id - The ID of the motivation to retrieve.
   * @param authUser - The authenticated user whose motivations are being queried.
   * @returns A promise that resolves to the motivation if found, or null if not found.
   */
  static async getById(id: number, authUser: User): Promise<Motivation | null> {
    return await authUser.related('motivations').query().where('id', id).first()
  }

  /**
   * Creates a new motivation entry related to the authenticated user.
   *
   * @param authUser - The authenticated user who is creating the motivation.
   * @param data - Partial data for the new motivation entry.
   * @returns A promise that resolves to the newly created Motivation object.
   */
  static async create(authUser: User, data: Partial<Motivation>): Promise<Motivation> {
    return await authUser.related('motivations').create(data)
  }

  /**
   * Updates a motivation record with the provided data.
   *
   * @param id - The ID of the motivation to update.
   * @param data - A partial object containing the fields to update in the motivation.
   * @param authUser - The authenticated user performing the update.
   * @returns A promise that resolves to the updated motivation or null if not found.
   * @throws An error if the motivation is not found.
   */
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

  /**
   * Deletes a motivation by its ID if it belongs to the authenticated user.
   *
   * @param id - The ID of the motivation to delete.
   * @param authUser - The authenticated user attempting to delete the motivation.
   * @returns A promise that resolves to `true` if the deletion was successful.
   * @throws An error if the motivation is not found.
   */
  static async delete(id: number, authUser: User): Promise<boolean> {
    const motivation = await authUser.related('motivations').query().where('id', id).first()
    if (!motivation) {
      throw new Error('Motivation not found')
    }
    await motivation.delete()
    return true
  }
}
