import factory from '@adonisjs/lucid/factories'
import Addiction from '#models/addiction'
import { ObjectiveFactory } from '#database/factories/objective_factory'

export const AddictionFactory = factory
  .define(Addiction, async ({ faker }) => {
    return {
      type: faker.helpers.arrayElement(['Alcohol', 'Smoking', 'Drugs', 'Gambling']),
      frequency: faker.helpers.arrayElement(['Daily', 'Weekly', 'Monthly']),
      duration: faker.helpers.arrayElement([
        '6 days',
        '20 days',
        '1 month',
        '6 months',
        '1 year',
        '3 years',
        '5 years',
      ]),
      consequences: faker.lorem.sentence(),
      weaning: faker.lorem.sentence(),
    }
  })
  .relation('objectives', () => ObjectiveFactory)
  .build()
