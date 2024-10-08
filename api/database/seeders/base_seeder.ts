import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'

export default class extends BaseSeeder {
  async run() {
    await UserFactory.with('generalInformation', 1)
      .with('addictions', 2, (addiction) => {
        addiction.with('objectives', 2)
      })
      .with('emotions', 3)
      .with('mentalHealths', 1)
      .with('motivations', 2)
      .createMany(10)
  }
}
