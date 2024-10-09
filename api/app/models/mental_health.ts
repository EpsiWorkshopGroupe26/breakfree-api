import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

/**
 * Represents the mental health status of a user.
 *
 * @extends BaseModel
 *
 * @property {number} id - The primary key of the mental health record.
 * @property {number} userId - The ID of the user associated with this mental health record.
 * @property {boolean} symptoms - Indicates whether the user has symptoms.
 * @property {number} stress - The stress level of the user.
 * @property {DateTime} createdAt - The timestamp when the record was created.
 * @property {DateTime} updatedAt - The timestamp when the record was last updated.
 * @property {BelongsTo<typeof User>} users - The relationship to the User model.
 */
export default class MentalHealth extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare symptoms: boolean

  @column()
  declare stress: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare users: BelongsTo<typeof User>
}
