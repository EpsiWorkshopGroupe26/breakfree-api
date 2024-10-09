import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

/**
 * Represents an Emotion model.
 *
 * @extends BaseModel
 *
 * @property {number} id - The primary key of the emotion.
 * @property {number} userId - The ID of the user associated with the emotion.
 * @property {string} states - The state of the emotion.
 * @property {DateTime} createdAt - The timestamp when the emotion was created.
 * @property {DateTime} updatedAt - The timestamp when the emotion was last updated.
 * @property {BelongsTo<typeof User>} users - The relationship to the User model.
 */
export default class Emotion extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare states: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare users: BelongsTo<typeof User>
}
