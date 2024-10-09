import Objective from '#models/objective'
import User from '#models/user'

export default class ObjectiveService {
  /**
   * Retrieves all objectives related to the authenticated user's addictions.
   *
   * @param {User} authUser - The authenticated user whose objectives are to be retrieved.
   * @returns {Promise<Objective[]>} A promise that resolves to an array of objectives.
   */
  static async getAll(authUser: User): Promise<Objective[]> {
    const addictions = await authUser.related('addictions').query()
    const objectives = []
    for (const addiction of addictions) {
      const addictionObjectives = await addiction.related('objectives').query()
      objectives.push(...addictionObjectives)
    }
    return objectives
  }

  /**
   * Retrieves an objective by its ID and the associated addiction ID for the authenticated user.
   *
   * @param id - The ID of the objective to retrieve.
   * @param idAddiction - The ID of the addiction associated with the objective.
   * @param authUser - The authenticated user requesting the objective.
   * @returns A promise that resolves to the objective if found.
   * @throws Will throw an error if the addiction or objective is not found.
   */
  static async getById(id: number, idAddiction: number, authUser: User): Promise<Objective> {
    const addiction = await authUser.related('addictions').query().where('id', idAddiction).first()
    if (!addiction) {
      throw new Error('Addiction not found')
    }
    const objective = await addiction.related('objectives').query().where('id', id).first()
    if (!objective) {
      throw new Error('Objective not found')
    }
    return objective
  }

  /**
   * Creates a new objective for a given addiction.
   *
   * @param id - The ID of the addiction to which the objective will be related.
   * @param data - Partial data for the new objective.
   * @param authUser - The authenticated user performing the operation.
   * @returns A promise that resolves to the created Objective.
   * @throws Will throw an error if the addiction is not found.
   */
  static async create(id: number, data: Partial<Objective>, authUser: User): Promise<Objective> {
    const addiction = await authUser.related('addictions').query().where('id', id).first()
    if (!addiction) {
      throw new Error('Addiction not found')
    }
    return await addiction.related('objectives').create(data)
  }

  /**
   * Updates an existing objective for a given addiction.
   *
   * @param idAddiction - The ID of the addiction to which the objective belongs.
   * @param id - The ID of the objective to update.
   * @param data - Partial data to update the objective with.
   * @param authUser - The authenticated user performing the update.
   * @returns A promise that resolves to the updated objective.
   * @throws Will throw an error if the addiction or objective is not found.
   */
  static async update(
    idAddiction: number,
    id: number,
    data: Partial<Objective>,
    authUser: User
  ): Promise<Objective> {
    const addiction = await authUser.related('addictions').query().where('id', idAddiction).first()
    if (!addiction) {
      throw new Error('Addiction not found')
    }
    const objective = await addiction.related('objectives').query().where('id', id).first()
    if (!objective) {
      throw new Error('Objective not found')
    }
    objective.merge(data)
    await objective.save()
    return objective
  }

  /**
   * Deletes an objective associated with a specific addiction for the authenticated user.
   *
   * @param idAddiction - The ID of the addiction.
   * @param id - The ID of the objective to be deleted.
   * @param authUser - The authenticated user performing the deletion.
   * @returns A promise that resolves to `true` if the objective was successfully deleted.
   * @throws Will throw an error if the addiction or objective is not found.
   */
  static async delete(idAddiction: number, id: number, authUser: User): Promise<boolean> {
    const addiction = await authUser.related('addictions').query().where('id', idAddiction).first()
    if (!addiction) {
      throw new Error('Addiction not found')
    }
    const objective = await addiction.related('objectives').query().where('id', id).first()
    if (!objective) {
      throw new Error('Objective not found')
    }
    await objective.delete()
    return true
  }
}
