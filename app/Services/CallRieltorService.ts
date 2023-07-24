import Logger from "@ioc:Adonis/Core/Logger";
import { ModelPaginatorContract } from "@ioc:Adonis/Lucid/Orm";
import CallRieltor from "App/Models/CallRieltor";
import CallRieltorValidator from "App/Validators/Api/CallRieltorValidator";
import { ResponseCodes, ResponseMessages } from "Contracts/response";
import { Error, PaginateConfig, ServiceConfig } from "Contracts/services";

type Columns = (typeof CallRieltor)["columns"][number];

export default class CallRieltorService {
  public static async paginate(
    config: PaginateConfig<Columns, CallRieltor>,
    columns: Columns[] = []
  ): Promise<ModelPaginatorContract<CallRieltor>> {
    return await CallRieltor.query().select(columns).get(config);
  }

  public static async get(
    id: CallRieltor["id"],
    { trx }: ServiceConfig<CallRieltor> = {}
  ): Promise<CallRieltor> {
    let item: CallRieltor | null;

    try {
      item = await CallRieltor.find(id, { client: trx });
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }

    if (!item)
      throw {
        code: ResponseCodes.CLIENT_ERROR,
        message: ResponseMessages.CALL_RIELTOR_NOT_FOUNT,
      } as Error;

    return item;
  }

  public static async create(
    payload: CallRieltorValidator["schema"]["props"],
    { trx }: ServiceConfig<CallRieltor> = {}
  ): Promise<CallRieltor> {
    try {
      return await CallRieltor.create(payload, { client: trx });
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async delete(
    id: CallRieltor["id"],
    { trx }: ServiceConfig<CallRieltor> = {}
  ): Promise<void> {
    let item: CallRieltor;

    try {
      item = await this.get(id, { trx });
    } catch (err: Error | any) {
      throw err;
    }

    try {
      await item.delete();
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }
}
