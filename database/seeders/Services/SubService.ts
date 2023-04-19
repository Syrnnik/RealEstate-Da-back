import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class SubServiceSeeder extends BaseSeeder {
  public async run() {
    try {
    } catch (err: any) {
      Logger.error(err);
    }
  }
}
