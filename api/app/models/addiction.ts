import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Objective from '#models/objective'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Addiction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

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
