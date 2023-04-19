import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Role from "App/Models/Users/Role";
import User from "App/Models/Users/User";
import RoleService from "App/Services/Users/RoleService";
import { Roles } from "Config/users";

export default class UserSeeder extends BaseSeeder {
  public async run() {
    try {
      const adminRole: Role | null = await RoleService.get(Roles.ADMIN);
      const managerRole: Role | null = await RoleService.get(Roles.MANAGER);
      const userRole: Role | null = await RoleService.get(Roles.USER);

      if (!adminRole) {
        Logger.error("Admin role is not defined!");
        return;
      }

      if (!managerRole) {
        Logger.error("Manager role is not defined!");
        return;
      }

      if (!userRole) {
        Logger.error("User role is not defined!");
        return;
      }

      await User.updateOrCreateMany(User.columns[8], [
        {
          ownerType: 0,
          firstName: "Admin",
          lastName: "Admin",
          email: "admin@mail.ru",
          password: "1234Admin",
          isActivated: true,
          roleId: adminRole.id,
        },
        {
          ownerType: 0,
          firstName: "Manager",
          lastName: "Manager",
          email: "manager@mail.ru",
          password: "1234Manager",
          isActivated: true,
          roleId: managerRole.id,
        },
        {
          ownerType: 0,
          firstName: "User",
          lastName: "User",
          email: "user@mail.ru",
          password: "1234User",
          isActivated: true,
          roleId: userRole.id,
        },
        {
          ownerType: 1,
          firstName: "Org",
          lastName: "User",
          email: "organization@mail.ru",
          password: "1234Org",
          isActivated: true,
          roleId: userRole.id,
          companyName: "TEST ORG",
          taxIdentificationNumber: "1234567890",
        },
      ]);

      // await UserFactory.with("realEstatesWishList", 4).createMany(50);
    } catch (err: any) {
      Logger.error(err);
    }
  }
}
