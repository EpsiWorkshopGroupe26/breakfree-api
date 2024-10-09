import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Objective from '#models/objective'
import type { HasMany } from '@adonisjs/lucid/types/relations'

/**
 * Represents an addiction model.
 *
 * @extends BaseModel
 *
 * @property {number} id - The primary key of the addiction.
 * @property {number} userId - The ID of the user associated with the addiction.
 * @property {string} type - The type of addiction.
 * @property {string} frequency - The frequency of the addiction.
 * @property {string} duration - The duration of the addiction.
 * @property {string} consequences - The consequences of the addiction.
 * @property {string} weaning - The weaning process of the addiction.
 * @property {HasMany<typeof Objective>} objectives - The objectives related to the addiction.
 * @property {DateTime} createdAt - The date and time when the addiction was created.
 * @property {DateTime} updatedAt - The date and time when the addiction was last updated.
 */
export default class Addiction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare type: string

  @column()
  declare frequency: string

  @column()
  declare duration: string

  @column()
  declare consequences: string

  @column()
  declare weaning: string

  @hasMany(() => Objective)
  declare objectives: HasMany<typeof Objective>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
