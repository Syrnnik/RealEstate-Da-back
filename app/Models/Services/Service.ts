import {
  BaseModel,
  BelongsTo,
  HasMany,
  ManyToMany,
  beforeDelete,
  belongsTo,
  column,
  computed,
  hasMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import CamelCaseNamingStrategy from "../../../start/CamelCaseNamingStrategy";
import District from "../District";
import Response from "../Response/Response";
import User from "../Users/User";
import Label from "./Label";
import ServicesTypesAttribute from "./ServicesTypesAttribute";
import SubService from "./SubService";

// import { EXPERIENCE_TYPES } from 'Config/services'

export default class Service extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy();
  public static readonly columns = [
    "id",
    "description",
    "isBanned",
    "userId",
    "servicesTypesAttributeId",
    "createdAt",
    "updatedAt",
  ] as const;

  @column({ isPrimary: true })
  public id: number;

  // @column()
  // public experienceType: number

  @column()
  public description: string;

  @column()
  public address: string;

  @column({ serializeAs: null })
  public isBanned: boolean;

  @column({ columnName: "user_id" })
  public userId: User["id"];

  @column({ columnName: "district_id" })
  public districtId: District["id"];

  @column({ columnName: "servicesTypesAttribute_id" })
  public servicesTypesAttributeId?: ServicesTypesAttribute["id"];

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: null,
  })
  public updatedAt: DateTime;

  // @computed()
  // public get experienceTypeForUser(): typeof EXPERIENCE_TYPES[number] {
  //   return EXPERIENCE_TYPES[this.experienceType]
  // }

  @computed({ serializeAs: null })
  public get isBannedForUser(): string {
    return this.isBanned ? "Да" : "Нет";
  }

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => District)
  public district: BelongsTo<typeof District>;

  @belongsTo(() => ServicesTypesAttribute)
  public attribute: BelongsTo<typeof ServicesTypesAttribute>;

  @hasMany(() => SubService)
  public subServices: HasMany<typeof SubService>;

  @hasMany(() => Response)
  public responses: HasMany<typeof Response>;

  @manyToMany(() => Label, {
    pivotTable: "labels_services",
  })
  public labels: ManyToMany<typeof Label>;

  @beforeDelete()
  public static async deleteAllRelations(item: Service) {
    await item.related("labels").detach([]);
  }
}
