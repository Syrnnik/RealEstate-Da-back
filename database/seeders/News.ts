import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class NewsSeeder extends BaseSeeder {
  public async run() {
    try {
      // await NewsFactory.createMany(15)
    } catch (err: any) {
      Logger.error(err);
    }
  }
}
