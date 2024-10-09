import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Addiction from '#models/addiction'

/**
 * Represents an Objective model.
 *
 * @extends BaseModel
 *
 * @property {number} id - The primary key of the objective.
 * @property {number} addictionId - The ID of the related addiction.
 * @property {string} description - A description of the objective.
 * @property {number} evolution - The evolution status of the objective.
 * @property {DateTime} createdAt - The timestamp when the objective was created.
 * @property {DateTime} updatedAt - The timestamp when the objective was last updated.
 * @property {BelongsTo<typeof Addiction>} addictions - The relationship to the Addiction model.
 */
export default class Objective extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare addictionId: number

  @column()
  declare description: string

  @column()
  declare evolution: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Addiction)
  declare addictions: BelongsTo<typeof Addiction>
}
