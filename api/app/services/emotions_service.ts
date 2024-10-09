import Emotion from '#models/emotion'
import User from '#models/user'

export default class EmotionService {
  /**
   * Retrieves all emotions related to the authenticated user.
   *
   * @param authUser - The authenticated user whose emotions are to be retrieved.
   * @returns A promise that resolves to an array of Emotion objects.
   */
  static async getAll(authUser: User): Promise<Emotion[]> {
    return await authUser.related('emotions').query()
  }

  /**
   * Retrieves an emotion by its ID for the authenticated user.
   *
   * @param id - The ID of the emotion to retrieve.
   * @param authUser - The authenticated user whose emotions are being queried.
   * @returns A promise that resolves to the emotion if found, or null if not found.
   */
  static async getById(id: number, authUser: User): Promise<Emotion | null> {
    return await authUser.related('emotions').query().where('id', id).first()
  }

  /**
   * Creates a new emotion record related to the authenticated user.
   *
   * @param authUser - The authenticated user who is creating the emotion.
   * @param data - Partial data for the new emotion record.
   * @returns A promise that resolves to the newly created emotion.
   */
  static async create(authUser: User, data: Partial<Emotion>): Promise<Emotion> {
    return await authUser.related('emotions').create(data)
  }

  /**
   * Updates an existing emotion record with the provided data.
   *
   * @param id - The ID of the emotion to update.
   * @param data - Partial data to update the emotion with.
   * @param authUser - The authenticated user performing the update.
   * @returns The updated emotion record.
   * @throws Will throw an error if the emotion is not found.
   */
  static async update(id: number, data: Partial<Emotion>, authUser: User) {
    const emotion = await authUser.related('emotions').query().where('id', id).first()
    if (!emotion) {
      throw new Error('Emotion not found')
    }
    emotion.merge(data)
    await emotion.save()
    return emotion
  }

  /**
   * Deletes an emotion associated with the authenticated user.
   *
   * @param id - The ID of the emotion to be deleted.
   * @param authUser - The authenticated user performing the deletion.
   * @returns A promise that resolves to `true` if the deletion was successful.
   * @throws Will throw an error if the emotion is not found.
   */
  static async delete(id: number, authUser: User) {
    const emotion = await authUser.related('emotions').query().where('id', id).first()
    if (!emotion) {
      throw new Error('Emotion not found')
    }
    await emotion.delete()
    return true
  }
}
