import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Roles extends BaseSchema {
  protected tableName = "roles";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").unique().notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("createdAt", { useTz: true });
      table.timestamp("updatedAt", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
