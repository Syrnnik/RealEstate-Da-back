import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import RealEstateType from "App/Models/RealEstates/RealEstateType";

export default class RealEstateTypeSeeder extends BaseSeeder {
  public async run() {
    try {
      await RealEstateType.createMany([
        { name: "Квартиры Комнаты" },
        { name: "Паркинг Гараж" },
        { name: "Земельные участки" },
        { name: "Коммерческая недвижимость" },
        { name: "Дом" },
      ]);
    } catch (err: any) {
      Logger.error(err);
    }
  }
}
