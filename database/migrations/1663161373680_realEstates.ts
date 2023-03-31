import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class RealEstates extends BaseSchema {
  protected tableName = "realEstates";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("cadastralNumber").nullable();
      table.string("landCadastralNumber").nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("cadastralNumber");
      table.dropColumn("landCadastralNumber");
    });
  }
}
