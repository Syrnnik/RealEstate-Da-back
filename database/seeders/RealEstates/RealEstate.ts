import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class RealEstateSeeder extends BaseSeeder {
  public async run() {
    try {
      // await RealEstateFactory.createMany(50)
    } catch (err: any) {
      Logger.error(err);
    }
  }
}
