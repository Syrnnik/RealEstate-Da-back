import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CallRieltors extends BaseSchema {
  protected tableName = "callRieltors";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("phone").notNullable();
      table.string("desc").notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("createdAt", { useTz: true });
      table.timestamp("updatedAt", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTableIfExists(this.tableName);
  }
}
