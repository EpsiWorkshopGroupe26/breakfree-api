import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

/**
 * Represents a Motivation model.
 *
 * @extends BaseModel
 *
 * @property {number} id - The primary key of the motivation.
 * @property {number} userId - The ID of the user associated with the motivation.
 * @property {string} states - The states of the motivation.
 * @property {boolean} support - Indicates if support is provided.
 * @property {boolean} consult - Indicates if consultation is provided.
 * @property {DateTime} createdAt - The timestamp when the motivation was created.
 * @property {DateTime} updatedAt - The timestamp when the motivation was last updated.
 * @property {BelongsTo<typeof User>} users - The relationship to the User model.
 */
export default class Motivation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare states: string

  @column()
  declare support: boolean

  @column()
  declare consult: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare users: BelongsTo<typeof User>
}
