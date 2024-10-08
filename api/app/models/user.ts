import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Addiction from '#models/addiction'
import Emotion from '#models/emotion'
import GeneralInformation from '#models/general_information'
import MentalHealth from '#models/mental_health'
import Motivation from '#models/motivation'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @hasOne(() => GeneralInformation)
  declare generalInformation: HasOne<typeof GeneralInformation>

  @hasMany(() => Addiction)
  declare addictions: HasMany<typeof Addiction>

  @hasMany(() => Emotion)
  declare emotions: HasMany<typeof Emotion>

  @hasMany(() => MentalHealth)
  declare mentalHealths: HasMany<typeof MentalHealth>

  @hasMany(() => Motivation)
  declare motivations: HasMany<typeof Motivation>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
