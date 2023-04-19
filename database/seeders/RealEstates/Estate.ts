import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Estate from "App/Models/RealEstates/Estate";

export default class EstateSeeder extends BaseSeeder {
  public async run() {
    try {
      await Estate.updateOrCreateMany(Estate.columns[2], [
        // Квартиры Комнаты
        { name: "Квартира", realEstateTypeId: 1 },
        { name: "Комната", realEstateTypeId: 1 },

        // Дома
        { name: "Дом", realEstateTypeId: 2 },
        { name: "Дача", realEstateTypeId: 2 },
        { name: "Таунхаус", realEstateTypeId: 2 },

        // Земельные участки
        { name: "ИЖС", realEstateTypeId: 3 },
        { name: "ЛПХ", realEstateTypeId: 3 },
        { name: "СНТ", realEstateTypeId: 3 },
        { name: "ДНП", realEstateTypeId: 3 },
        { name: "Промназначения", realEstateTypeId: 3 },

        // Паркинг Гараж
        { name: "Паркинг", realEstateTypeId: 4 },
        { name: "Гараж", realEstateTypeId: 4 },

        // Коммерческая недвижимость
        { name: "Апартаменты", realEstateTypeId: 5 },
        { name: "Офис", realEstateTypeId: 5 },
        { name: "Склад", realEstateTypeId: 5 },
        { name: "Гостиница", realEstateTypeId: 5 },
        { name: "Медицинский центр", realEstateTypeId: 5 },
        { name: "Свободного назначения", realEstateTypeId: 5 },
        { name: "Производство", realEstateTypeId: 5 },
        { name: "Автосервис", realEstateTypeId: 5 },
        { name: "Розничный магазин", realEstateTypeId: 5 },
        { name: "Готовый бизнес", realEstateTypeId: 5 },
        { name: "Торговая площадь", realEstateTypeId: 5 },
        { name: "Общепит", realEstateTypeId: 5 },
        { name: "Здание целиком", realEstateTypeId: 5 },
        { name: "Многоквартирный жилой дом", realEstateTypeId: 5 },
      ]);
    } catch (err) {
      Logger.error(err);
    }
  }
}
