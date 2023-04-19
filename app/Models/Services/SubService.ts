import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import CamelCaseNamingStrategy from "../../../start/CamelCaseNamingStrategy";
import Service from "./Service";
import ServicesTypesSubService from "./ServicesTypesSubService";

export default class SubService extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy();
  public static readonly columns = [
    "id",
    "serviceId",
    "serviceTypeSubServiceId",
    "createdAt",
    "updatedAt",
  ] as const;

  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "service_id" })
  public serviceId: Service["id"];

  @column({ columnName: "serviceTypeSubService_id" })
  public serviceTypeSubServiceId: ServicesTypesSubService["id"];

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: null,
  })
  public updatedAt: DateTime;

  @belongsTo(() => Service)
  public service: BelongsTo<typeof Service>;
}
