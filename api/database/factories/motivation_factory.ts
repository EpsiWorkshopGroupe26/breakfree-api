import factory from '@adonisjs/lucid/factories'
import Motivation from '#models/motivation'

export const MotivationFactory = factory
  .define(Motivation, async ({ faker }) => {
    return {
      states: faker.helpers.arrayElement(['Improve Health', 'Quit Addiction', 'Seek Support']),
      support: faker.datatype.boolean(),
      consult: faker.datatype.boolean(),
    }
  })
  .build()
