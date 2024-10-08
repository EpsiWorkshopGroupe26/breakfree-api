import factory from '@adonisjs/lucid/factories'
import Emotion from '#models/emotion'

export const EmotionFactory = factory
  .define(Emotion, async ({ faker }) => {
    return {
      states: faker.helpers.arrayElement(['Happy', 'Sad', 'Anxious', 'Depressed', 'Angry']),
    }
  })
  .build()
