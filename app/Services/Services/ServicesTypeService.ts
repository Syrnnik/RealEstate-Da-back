import Logger from "@ioc:Adonis/Core/Logger";
import ServicesType from "App/Models/Services/ServicesType";
import ServicesTypesAttribute from "App/Models/Services/ServicesTypesAttribute";
import ServicesTypesSubService from "App/Models/Services/ServicesTypesSubService";
import ServicesTypeValidator from "App/Validators/Services/ServicesTypeValidator";
import { ResponseCodes, ResponseMessages } from "Contracts/response";
import { Error, ServiceConfig } from "Contracts/services";
import BaseService from "../BaseService";

type ValidatorPayload = ServicesTypeValidator["schema"]["props"];

export default class ServicesTypeService extends BaseService {
  public static async getAll(
    columns: typeof ServicesType["columns"][number][] = []
  ): Promise<ServicesType[]> {
    try {
      return await ServicesType.query().select(columns);
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async getAllSubServicesTypes(
    serviceTypeId: ServicesType["id"]
  ): Promise<ServicesTypesSubService[]> {
    try {
      return await ServicesTypesSubService.query().where(
        "servicesType_id",
        serviceTypeId
      );
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async getAllAttributesTypes(
    serviceTypeId: ServicesType["id"]
  ): Promise<ServicesTypesAttribute[]> {
    try {
      return await ServicesTypesAttribute.query().where(
        "servicesType_id",
        serviceTypeId
      );
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async get(
    id: ServicesType["id"],
    { trx }: ServiceConfig<ServicesType> = {}
  ): Promise<ServicesType> {
    let item: ServicesType | null;

    try {
      item = await ServicesType.findBy("id", id, { client: trx });
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }

    try {
      if (!item) throw new Error();

      return item;
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.CLIENT_ERROR,
        message: ResponseMessages.SERVICES_TYPES_NOT_FOUND,
      } as Error;
    }
  }

  public static async create(
    payload: ValidatorPayload,
    { trx }: ServiceConfig<ServicesType> = {}
  ): Promise<ServicesType> {
    try {
      return (await ServicesType.create(payload, { client: trx }))!;
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async update(
    id: ServicesType["id"],
    payload: ValidatorPayload,
    config: ServiceConfig<ServicesType> = {}
  ): Promise<ServicesType> {
    let item: ServicesType;

    try {
      item = await this.get(id, config);
    } catch (err: Error | any) {
      throw err;
    }

    try {
      return await item.merge(payload).save();
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.CLIENT_ERROR,
        message: ResponseMessages.SERVICES_TYPES_NOT_FOUND,
      } as Error;
    }
  }

  public static async delete(
    id: ServicesType["id"],
    config: ServiceConfig<ServicesType> = {}
  ): Promise<void> {
    let item: ServicesType;

    try {
      item = await this.get(id, config);
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }

    try {
      await item.delete();
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.CLIENT_ERROR,
        message: ResponseMessages.SERVICES_TYPES_NOT_FOUND,
      } as Error;
    }
  }
}
