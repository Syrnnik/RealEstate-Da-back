import Logger from "@ioc:Adonis/Core/Logger";
import { ModelPaginatorContract } from "@ioc:Adonis/Lucid/Orm";
import SubService from "App/Models/Services/SubService";
import SubServiceValidator from "App/Validators/Services/SubServiceValidator";
import { ResponseCodes, ResponseMessages } from "Contracts/response";
import { Error, PaginateConfig, ServiceConfig } from "Contracts/services";
import BaseService from "../BaseService";

type Columns = typeof SubService["columns"][number];
type ValidatorPayload = SubServiceValidator["schema"]["props"];

export default class SubServiceService extends BaseService {
  public static async paginate(
    config: PaginateConfig<Columns, SubService>,
    columns: Columns[] = []
  ): Promise<ModelPaginatorContract<SubService>> {
    let query = SubService.query().select(columns);

    if (config.relations) {
      for (let item of config.relations) {
        query = query.preload(item);
      }
    }

    return await query.get(config);
  }

  public static async get(
    id: SubService["id"],
    config: ServiceConfig<SubService> = {}
  ): Promise<SubService> {
    let item: SubService | null;

    try {
      item = await SubService.find(id, { client: config.trx });
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }

    try {
      if (!item) throw new Error();

      if (config.relations) {
        for (let relationItem of config.relations) {
          await item.load(relationItem);
        }
      }

      return item;
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.CLIENT_ERROR,
        message: ResponseMessages.NEWS_NOT_FOUND,
      } as Error;
    }
  }

  public static async create(
    payload: ValidatorPayload,
    { trx }: ServiceConfig<SubService> = {}
  ): Promise<SubService> {
    let item: SubService;
    const { ...servicePayload } = payload;

    try {
      item = await SubService.create({ ...servicePayload }, { client: trx });
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }

    return item;
  }

  public static async update(
    id: SubService["id"],
    payload: ValidatorPayload,
    config: ServiceConfig<SubService> = {}
  ): Promise<SubService> {
    let item: SubService;
    const { ...servicePayload } = payload;

    try {
      item = await this.get(id, config);
    } catch (err: any) {
      // await config.trx.rollback()

      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }

    try {
      item = await item.merge({ ...servicePayload }).save();

      // await config.trx.commit()
      return item;
    } catch (err: any) {
      // await config.trx.rollback()

      Logger.error(err);
      throw {
        code: ResponseCodes.SERVER_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async delete(
    id: SubService["id"],
    config: ServiceConfig<SubService> = {}
  ): Promise<void> {
    let item: SubService;

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
        message: ResponseMessages.SERVICE_NOT_FOUND,
      } as Error;
    }
  }
}
