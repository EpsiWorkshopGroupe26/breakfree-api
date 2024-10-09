import MentalHealth from '#models/mental_health'
import User from '#models/user'

export default class MentalHealthService {
  /**
   * Retrieves all mental health records related to the authenticated user.
   *
   * @param authUser - The authenticated user whose mental health records are to be retrieved.
   * @returns A promise that resolves to an array of MentalHealth objects.
   */
  static async getAll(authUser: User): Promise<MentalHealth[]> {
    return await authUser.related('mentalHealths').query()
  }

  /**
   * Retrieves a MentalHealth record by its ID for the authenticated user.
   *
   * @param id - The ID of the MentalHealth record to retrieve.
   * @param authUser - The authenticated user whose related MentalHealth records are being queried.
   * @returns A promise that resolves to the MentalHealth record if found, otherwise null.
   */
  static async getById(id: number, authUser: User): Promise<MentalHealth | null> {
    return await authUser.related('mentalHealths').query().where('id', id).first()
  }

  /**
   * Creates a new MentalHealth record associated with the authenticated user.
   *
   * @param authUser - The authenticated user who is creating the mental health record.
   * @param data - Partial data for the new MentalHealth record.
   * @returns A promise that resolves to the newly created MentalHealth record.
   */
  static async create(authUser: User, data: Partial<MentalHealth>): Promise<MentalHealth> {
    return await authUser.related('mentalHealths').create(data)
  }

  /**
   * Updates a mental health record with the given data.
   *
   * @param id - The ID of the mental health record to update.
   * @param data - The partial data to update the mental health record with.
   * @param authUser - The authenticated user performing the update.
   * @returns A promise that resolves to the updated mental health record, or null if the record was not found.
   */
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

  /**
   * Deletes a mental health record associated with the authenticated user.
   *
   * @param id - The ID of the mental health record to delete.
   * @param authUser - The authenticated user attempting to delete the record.
   * @returns A promise that resolves to `true` if the record was successfully deleted, or `false` if the record was not found.
   */
  static async delete(id: number, authUser: User): Promise<boolean> {
    const health = await authUser.related('mentalHealths').query().where('id', id).first()
    if (!health) {
      return false
    }
    await health.delete()
    return true
  }
}
