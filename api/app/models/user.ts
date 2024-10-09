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

/**
 * Represents a User model that extends BaseModel and AuthFinder.
 *
 * @class User
 *
 * @property {number} id - The primary key of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user, not serialized.
 * @property {HasOne<typeof GeneralInformation>} generalInformation - The general information associated with the user.
 * @property {HasMany<typeof Addiction>} addictions - The addictions associated with the user.
 * @property {HasMany<typeof Emotion>} emotions - The emotions associated with the user.
 * @property {HasMany<typeof MentalHealth>} mentalHealths - The mental health records associated with the user.
 * @property {HasMany<typeof Motivation>} motivations - The motivations associated with the user.
 * @property {DateTime} createdAt - The date and time when the user was created.
 * @property {DateTime | null} updatedAt - The date and time when the user was last updated.
 *
 * @static
 * @property {DbAccessTokensProvider} accessTokens - The access tokens provider for the User model.
 */
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
