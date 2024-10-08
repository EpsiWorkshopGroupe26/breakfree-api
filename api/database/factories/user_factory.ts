import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { GeneralInformationFactory } from '#database/factories/general_information_factory'
import { AddictionFactory } from '#database/factories/addiction_factory'
import { EmotionFactory } from '#database/factories/emotion_factory'
import { MentalHealthFactory } from '#database/factories/mental_health_factory'
import { MotivationFactory } from '#database/factories/motivation_factory'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .relation('generalInformation', () => GeneralInformationFactory)
  .relation('addictions', () => AddictionFactory)
  .relation('emotions', () => EmotionFactory)
  .relation('mentalHealths', () => MentalHealthFactory)
  .relation('motivations', () => MotivationFactory)
  .build()
