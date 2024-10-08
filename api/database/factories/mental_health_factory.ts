import factory from '@adonisjs/lucid/factories'
import MentalHealth from '#models/mental_health'

export const MentalHealthFactory = factory
  .define(MentalHealth, async ({ faker }) => {
    return {
      symptoms: faker.datatype.boolean(),
      stress: faker.datatype.number({ min: 0, max: 10 }),
    }
  })
  .build()
