import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { RESPONSES_DESCRIPTION_MAX_LENGTH } from "Config/response";

export default class Responses extends BaseSchema {
  protected tableName = "responses";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("status").unsigned().notNullable().comment(`
        Только для откликов на услуги
        0 - на рассмотрении
        1 - выполняется
        2 - выполнен
      `);
      table.string("description", RESPONSES_DESCRIPTION_MAX_LENGTH).nullable();

      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onDelete("CASCADE");

      table
        .integer("service_id")
        .unsigned()
        .notNullable()
        .references("services.id")
        .onDelete("CASCADE");

      table
        .integer("realEstate_id")
        .unsigned()
        .nullable()
        .references("realEstates.id")
        .onDelete("CASCADE");

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
