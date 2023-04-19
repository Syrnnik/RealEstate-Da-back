import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class SubServices extends BaseSchema {
  protected tableName = "subServices";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table
        .integer("service_id")
        .unsigned()
        .notNullable()
        .references("services.id")
        .onDelete("CASCADE");
      table
        .integer("serviceTypeSubService_id")
        .unsigned()
        .notNullable()
        .references("servicesTypesSubServices.id")
        .onDelete("CASCADE");

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
