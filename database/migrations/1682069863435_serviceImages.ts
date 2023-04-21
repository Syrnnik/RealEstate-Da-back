import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ServiceImages extends BaseSchema {
  protected tableName = "serviceImages";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("image").notNullable();

      table
        .integer("service_id")
        .unsigned()
        .notNullable()
        .references("services.id")
        .onDelete("CASCADE");

      table.timestamp("createdAt", { useTz: true });
      table.timestamp("updatedAt", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTableIfExists(this.tableName);
  }
}
