import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class RealEstatesWishlists extends BaseSchema {
  protected tableName = "realEstatesWishlists";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onDelete("CASCADE");
      table
        .integer("realEstate_id")
        .unsigned()
        .notNullable()
        .references("realEstates.id")
        .onDelete("CASCADE");
      table.unique(["user_id", "realEstate_id"]);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("createdAt", { useTz: true });
      table.timestamp("updatedAt", { useTz: true });

      table.comment("Списки избранных объявлений пользователей");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
