import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Addiction from '#models/addiction'

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
