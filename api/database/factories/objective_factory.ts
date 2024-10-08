import factory from '@adonisjs/lucid/factories'
import Objective from '#models/objective'

export const ObjectiveFactory = factory
  .define(Objective, async ({ faker }) => {
    return {
      description: faker.lorem.sentence(),
      evolution: faker.datatype.number({ min: 0, max: 100 }),
    }
  })
  .build()
