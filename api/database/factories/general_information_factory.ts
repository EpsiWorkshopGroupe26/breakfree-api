import factory from '@adonisjs/lucid/factories'
import GeneralInformation from '#models/general_information'

export const GeneralInformationFactory = factory
  .define(GeneralInformation, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      name: faker.person.lastName(),
      age: faker.datatype.number({ min: 18, max: 100 }),
      genre: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
      situation: faker.helpers.arrayElement([
        'Student',
        'Employee',
        'Self-employed',
        'Unemployed',
        'Other',
      ]),
    }
  })
  .build()
