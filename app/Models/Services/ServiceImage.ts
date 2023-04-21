import Drive from "@ioc:Adonis/Core/Drive";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { IMG_PLACEHOLDER } from "Config/drive";
import { DateTime } from "luxon";
import CamelCaseNamingStrategy from "../../../start/CamelCaseNamingStrategy";
import Service from "./Service";

export default class ServiceImage extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy();
  public static readonly columns = [
    "id",
    "image",
    "serviceId",
    "createdAt",
    "updatedAt",
  ] as const;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public image: string;

  @column({ columnName: "service_id" })
  public serviceId: Service["id"];

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  public async imageUrl(): Promise<string> {
    return this.image ? await Drive.getUrl(this.image) : IMG_PLACEHOLDER;
  }
}
