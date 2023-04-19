import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Role from "App/Models/Users/Role";
import { Roles } from "Config/users";

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    await Role.updateOrCreateMany(Role.columns[1], [
      { name: Roles.ADMIN },
      { name: Roles.MANAGER },
      { name: Roles.USER },
    ]);
  }
}
