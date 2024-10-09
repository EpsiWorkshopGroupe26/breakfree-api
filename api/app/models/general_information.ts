import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

/**
 * Represents the general information of a user.
 *
 * @extends BaseModel
 *
 * @property {number} id - The primary key of the general information.
 * @property {number} userId - The ID of the user associated with this general information.
 * @property {string} firstName - The first name of the user.
 * @property {string} name - The last name of the user.
 * @property {number} age - The age of the user.
 * @property {string} genre - The genre of the user.
 * @property {string} situation - The current situation of the user.
 * @property {DateTime} createdAt - The date and time when the record was created.
 * @property {DateTime} updatedAt - The date and time when the record was last updated.
 * @property {BelongsTo<typeof User>} users - The relationship to the User model.
 */
export default class GeneralInformation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare firstName: string

  @column()
  declare name: string

  @column()
  declare age: number

  @column()
  declare genre: string

  @column()
  declare situation: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare users: BelongsTo<typeof User>
}
