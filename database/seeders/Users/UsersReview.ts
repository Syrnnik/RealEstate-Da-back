import Logger from '@ioc:Adonis/Core/Logger'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class UsersReviewSeeder extends BaseSeeder {
  public async run () {
    try {
      // await UsersReviewsFactory.createMany(50)
    } catch (err: any) {
      Logger.error(err)
    }
  }
}
