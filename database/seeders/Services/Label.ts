import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class LabelSeeder extends BaseSeeder {
  public async run() {
    try {
      // await LabelFactory.createMany(50)
    } catch (err) {
      Logger.error(err);
    }
  }
}
