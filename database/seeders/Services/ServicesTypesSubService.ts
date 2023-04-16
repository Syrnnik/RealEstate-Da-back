import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import ServicesTypesSubService from "App/Models/Services/ServicesTypesSubService";

export default class ServicesTypesSubServiceSeeder extends BaseSeeder {
  public async run() {
    try {
      await ServicesTypesSubService.createMany([
        // Услуги риелтора
        { name: "Агентства недвижимости", servicesTypeId: 1 },
        { name: "Частный риелтор", servicesTypeId: 1 },
        { name: "Геодезист", servicesTypeId: 1 },
        { name: "Кадастровый инженер", servicesTypeId: 1 },
        { name: "Оценщик", servicesTypeId: 1 },
        { name: "Нотариус", servicesTypeId: 1 },
        { name: "Страховщик", servicesTypeId: 1 },

        // Дизайн
        { name: "Дизайн интерьера", servicesTypeId: 2 },
        { name: "Дизайн экстерьера", servicesTypeId: 2 },
        { name: "Ландшафтный дизайн", servicesTypeId: 2 },
        { name: "Дизайн интерьера и экстерьера", servicesTypeId: 2 },
        { name: "Дизайн интерьера и ландшафтный дизайн", servicesTypeId: 2 },
        { name: "Дизайн экстерьера и ландшафтный дизайн", servicesTypeId: 2 },
        {
          name: "Дизайн интерьера, экстерьера и ландшафтный дизайн",
          servicesTypeId: 2,
        },

        // Ремонт / строительство
        { name: "Ремонт квартиры", servicesTypeId: 3 },
        { name: "Отделочные работы", servicesTypeId: 3 },
        { name: "Сборка и ремонт мебели", servicesTypeId: 3 },
        { name: "Электрика", servicesTypeId: 3 },
        { name: "Сантехника", servicesTypeId: 3 },
        { name: "Остекление", servicesTypeId: 3 },
        { name: "Установка техники", servicesTypeId: 3 },
        { name: "Уборка", servicesTypeId: 3 },
        { name: "Строительство", servicesTypeId: 3 },
        { name: "Интернет", servicesTypeId: 3 },

        // Грузоперевозки / Грузчики
        { name: "По городу", servicesTypeId: 4 },
        { name: "Межгород", servicesTypeId: 4 },
        { name: "По городу и межгород", servicesTypeId: 4 },
        { name: "Грузчики", servicesTypeId: 4 },
      ]);
    } catch (err: any) {
      Logger.error(err);
    }
  }
}
