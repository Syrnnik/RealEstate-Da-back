import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import District from "App/Models/District";

export default class DistrictSeeder extends BaseSeeder {
  public async run() {
    try {
      await District.updateOrCreateMany(District.columns[1], [
        {
          city: "Казань",
          name: "Ново-Савиновский",
        },
        {
          city: "Казань",
          name: "Советский",
        },
        {
          city: "Казань",
          name: "Московский",
        },
        {
          city: "Казань",
          name: "Кировский",
        },
        {
          city: "Казань",
          name: "Авиастроительный",
        },
        {
          city: "Казань",
          name: "Приволжский",
        },
      ]);

      // await DistrictFactory.createMany(30)
    } catch (err: any) {
      Logger.error(err);
    }
  }
}
