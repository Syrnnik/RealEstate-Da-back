import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Estate from "App/Models/RealEstates/Estate";

export default class EstateSeeder extends BaseSeeder {
  public async run() {
    try {
      await Estate.updateOrCreateMany(
        Estate.columns[2],
        [
          // Квартиры Комнаты
          { name: "Квартира", realEstateTypeId: 1 },
          { name: "Комната", realEstateTypeId: 1 },

          // Паркинг Гараж
          { name: "Паркинг", realEstateTypeId: 2 },
          { name: "Гараж", realEstateTypeId: 2 },
          
          // Земельные участки
          { name: "ИЖС", realEstateTypeId: 3 },
          { name: "ЛПХ", realEstateTypeId: 3 },
          { name: "СНТ", realEstateTypeId: 3 },
          { name: "ДНП", realEstateTypeId: 3 },
          { name: "Промназначения", realEstateTypeId: 3 },
          
          // Коммерческая недвижимость
          { name: "Офис", realEstateTypeId: 4 },
          { name: "Склад", realEstateTypeId: 4 },
          { name: "Гостиница", realEstateTypeId: 4 },
          { name: "Медицинский центр", realEstateTypeId: 4 },
          { name: "Свободного назначения", realEstateTypeId: 4 },
          { name: "Производство", realEstateTypeId: 4 },
          { name: "Автосервис", realEstateTypeId: 4 },
          { name: "Розничный магазин", realEstateTypeId: 4 },
          { name: "Готовый бизнес", realEstateTypeId: 4 },
          { name: "Торговая площадь", realEstateTypeId: 4 },
          { name: "Общепит", realEstateTypeId: 4 },
          { name: "Здание целиком", realEstateTypeId: 4 },
          { name: "Многоквартирный жилой дом", realEstateTypeId: 4 },
        ]
      );
    } catch (err) {
      Logger.error(err);
    }
  }
}
