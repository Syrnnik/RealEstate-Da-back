import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import RealEstateType from "App/Models/RealEstates/RealEstateType";

export default class RealEstateTypeSeeder extends BaseSeeder {
  public async run() {
    try {
      await RealEstateType.updateOrCreateMany(RealEstateType.columns[2], [
        { name: "Квартира Комната" },
        { name: "Дом Дача" },
        { name: "Земельный участок" },
        { name: "Паркинг Гараж" },
        { name: "Коммерческая недвижимость" },
      ]);
    } catch (err: any) {
      Logger.error(err);
    }
  }
}
