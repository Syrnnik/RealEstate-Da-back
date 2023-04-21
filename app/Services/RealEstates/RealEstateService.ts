import Redis from "@ioc:Adonis/Addons/Redis";
import Drive from "@ioc:Adonis/Core/Drive";
import Logger from "@ioc:Adonis/Core/Logger";
import Database from "@ioc:Adonis/Lucid/Database";
import {
  ModelObject,
  ModelPaginatorContract,
  ModelQueryBuilderContract,
} from "@ioc:Adonis/Lucid/Orm";
import District from "App/Models/District";
import Estate from "App/Models/RealEstates/Estate";
import RealEstate from "App/Models/RealEstates/RealEstate";
import RealEstateImage from "App/Models/RealEstates/RealEstateImage";
import User from "App/Models/Users/User";
import ApiValidator from "App/Validators/Api/ApiValidator";
import RealEstateGetForMapValidator from "App/Validators/Api/RealEstates/RealEstateGetForMapValidator";
import RealEstateRecommendedValidator from "App/Validators/Api/RealEstates/RealEstateRecommendedValidator";
import RealEstateApiValidator from "App/Validators/Api/RealEstates/RealEstateValidator";
import RealEstateValidator from "App/Validators/RealEstates/RealEstateValidator";
import { REAL_ESTATE_PATH } from "Config/drive";
import { ResponseCodes, ResponseMessages } from "Contracts/response";
import {
  Error,
  JSONPaginate,
  PaginateConfig,
  ServiceConfig,
} from "Contracts/services";
import { DateTime } from "luxon";
import { removeFirstWord, removeLastLetter } from "../../../helpers";
import BaseService from "../BaseService";
import DistrictService from "../DistrictService";
import UserService from "../Users/UserService";

type Columns = typeof RealEstate["columns"][number];
type ValidatorPayload = RealEstateValidator["schema"]["props"];
type GetMethodConfig = ServiceConfig<RealEstate> & {
  isForApi?: boolean;
};

export default class RealEstateService extends BaseService {
  public static async paginate(
    config: PaginateConfig<Columns, RealEstate>,
    columns: Columns[] = []
  ): Promise<ModelPaginatorContract<RealEstate>> {
    let query = RealEstate.query().select(columns);
    if (config.relations) {
      for (const item of config.relations) {
        query = query.preload(item);
      }
    }

    return await query.get(config);
  }

  public static async getForMap(
    city: string,
    payload: RealEstateGetForMapValidator["schema"]["props"]
  ): Promise<RealEstate[]> {
    try {
      let query = RealEstate.query()
        .preload("estate")
        .whereHas("district", (query) => {
          query.where("city", city);
        });

      query = this.filter(payload, query);

      return await query;
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async getFromMap(
    realEstatesIds: RealEstate["id"][],
    currentUserId?: User["id"]
  ): Promise<ModelObject[]> {
    try {
      let realEstates: ModelObject[] = await RealEstate.query().whereIn(
        "id",
        realEstatesIds
      );

      if (currentUserId)
        realEstates = await Promise.all(
          realEstates.map((item: RealEstate) => item.getForUser(currentUserId))
        );

      return realEstates;
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async get(
    uuid: RealEstate["uuid"],
    config: GetMethodConfig = {}
  ): Promise<RealEstate> {
    let item: RealEstate | null;

    try {
      item = await RealEstate.findBy("uuid", uuid, { client: config.trx });
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
        message: ResponseMessages.REAL_ESTATE_NOT_FOUND,
      } as Error;

    try {
      if (config.isForApi) {
        const viewsCount: number = item.viewsCount + 1;

        await item.merge({ viewsCount }).save();
        item = (await RealEstate.findBy("uuid", uuid, { client: config.trx }))!;
      }

      if (config.relations) {
        for (let relationItem of config.relations) {
          await item.load(relationItem);
        }
      }

      return item;
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async create(
    payload: RealEstateValidator["schema"]["props"]
  ): Promise<RealEstate> {
    let item: RealEstate;
    let image: string | undefined;
    let imageBasePath: string;
    let districtId: District["id"];
    const { district, ...realEstatePayload } = payload;

    district.name = district.name.toLowerCase();
    district.city = district.city.toLowerCase();

    // if (!trx)
    //   trx = await Database.transaction()

    try {
      // districtId = (await DistrictService.create(payload.district.name, payload.district.city, { trx })).id
      districtId = (
        await DistrictService.create(
          payload.district.name,
          payload.district.city
        )
      ).id;
    } catch (err: Error | any) {
      districtId = (
        await DistrictService.getByNameAndCity(
          payload.district.name,
          payload.district.city
        )
      ).id;
    }

    try {
      // item = await RealEstate.create({ ...realEstatePayload, image, districtId }, { client: trx })
      item = await RealEstate.create({
        ...realEstatePayload,
        image,
        districtId,
      });

      imageBasePath = `${REAL_ESTATE_PATH}/${item.uuid}`;
    } catch (err: any) {
      // await trx.rollback()

      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }

    try {
      if (payload.image) {
        await payload.image.moveToDisk(imageBasePath);
        image = `${imageBasePath}/${payload.image.fileName}`;

        item = await item.merge({ image }).save();
      }

      if (payload.images) {
        for (const imageItem of payload.images) {
          if (imageItem) {
            await imageItem.moveToDisk(`${imageBasePath}/images`);
            await item.related("images").create({
              image: `${imageBasePath}/images/${imageItem.fileName}`,
            });
          }
        }
      }
    } catch (err: any) {
      // await trx.rollback()

      Logger.error(err);
      throw {
        code: ResponseCodes.SERVER_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }

    // await trx.commit()
    return item;
  }

  public static async update(
    uuid: RealEstate["uuid"],
    payload: ValidatorPayload
  ): Promise<RealEstate> {
    let item: RealEstate;
    let image: string | undefined;
    let imageBasePath: string;
    let districtId: District["id"];
    const { district, ...realEstatePayload } = payload;

    district.name = district.name.toLowerCase();
    district.city = district.city.toLowerCase();

    // if (!trx)
    //   trx = await Database.transaction()

    try {
      // districtId = (await DistrictService.create(payload.district.name, payload.district.city, { trx })).id
      districtId = (
        await DistrictService.create(
          payload.district.name,
          payload.district.city
        )
      ).id;
    } catch (err: Error | any) {
      districtId = (
        await DistrictService.getByNameAndCity(
          payload.district.name,
          payload.district.city
        )
      ).id;
    }

    try {
      // item = await this.get(uuid, { trx })
      item = await this.get(uuid);

      imageBasePath = `${REAL_ESTATE_PATH}/${item.uuid}`;
    } catch (err: Error | any) {
      // await trx.rollback()

      throw err;
    }

    try {
      if (payload.image) {
        if (item.image) await Drive.delete(item.image);

        await payload.image.moveToDisk(imageBasePath);
        image = `${imageBasePath}/${payload.image.fileName}`;
      }

      if (payload.images) {
        for (const imageItem of payload.images) {
          if (imageItem) {
            await imageItem.moveToDisk(`${imageBasePath}/images`);
            await item.related("images").create({
              image: `${imageBasePath}/images/${imageItem.fileName}`,
            });
          }
        }
      }
    } catch (err: any) {
      // await trx.rollback()

      Logger.error(err);
      throw {
        code: ResponseCodes.SERVER_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }

    try {
      // await trx.commit()

      return await item
        .merge({ ...realEstatePayload, image, districtId })
        .save();
    } catch (err: any) {
      // await trx.rollback()

      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async delete(
    uuid: RealEstate["uuid"],
    { trx }: ServiceConfig<RealEstate> = {}
  ): Promise<void> {
    let item: RealEstate;

    if (!trx) trx = await Database.transaction();

    try {
      item = await this.get(uuid, { trx });
    } catch (err: Error | any) {
      await trx.rollback();

      throw err;
    }

    try {
      await item.delete();
    } catch (err: any) {
      await trx.rollback();

      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }

    try {
      if (item.image) await Drive.delete(item.image);

      if (item.images) {
        for (const imageItem of item.images) {
          await Drive.delete(imageItem.image);
          await imageItem.delete();
        }
      }

      await trx.commit();
    } catch (err: any) {
      await trx.rollback();

      Logger.error(err);
      throw {
        code: ResponseCodes.SERVER_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async block(
    uuid: RealEstate["uuid"],
    { trx }: ServiceConfig<RealEstate> = {}
  ): Promise<RealEstate> {
    try {
      return (await this.get(uuid, { trx })).merge({ isBanned: true }).save();
    } catch (err: Error | any) {
      throw err;
    }
  }

  public static async unblock(
    uuid: RealEstate["uuid"],
    { trx }: ServiceConfig<RealEstate> = {}
  ): Promise<RealEstate> {
    try {
      return (await this.get(uuid, { trx })).merge({ isBanned: false }).save();
    } catch (err: Error | any) {
      throw err;
    }
  }

  public static async makeHot(
    uuid: RealEstate["uuid"],
    { trx }: ServiceConfig<RealEstate> = {}
  ): Promise<RealEstate> {
    try {
      return (await this.get(uuid, { trx })).merge({ isHot: true }).save();
    } catch (err: Error | any) {
      throw err;
    }
  }

  public static async unmakeHot(
    uuid: RealEstate["uuid"],
    { trx }: ServiceConfig<RealEstate> = {}
  ): Promise<RealEstate> {
    try {
      return (await this.get(uuid, { trx })).merge({ isHot: false }).save();
    } catch (err: Error | any) {
      throw err;
    }
  }

  public static async makeVip(
    uuid: RealEstate["uuid"],
    { trx }: ServiceConfig<RealEstate> = {}
  ): Promise<RealEstate> {
    try {
      return (await this.get(uuid, { trx })).merge({ isVip: true }).save();
    } catch (err: Error | any) {
      throw err;
    }
  }

  public static async unmakeVip(
    uuid: RealEstate["uuid"],
    { trx }: ServiceConfig<RealEstate> = {}
  ): Promise<RealEstate> {
    try {
      return (await this.get(uuid, { trx })).merge({ isVip: false }).save();
    } catch (err: Error | any) {
      throw err;
    }
  }

  public static async search(
    city: string,
    payload: RealEstateApiValidator["schema"]["props"]
  ): Promise<JSONPaginate> {
    if (!payload.limit) payload.limit = 15;

    try {
      let query = RealEstate.query()
        .preload("estate")
        .whereHas("district", (query) => {
          query.where("city", city);
        });

      query = this.filter(payload, query);

      return (
        await query.get({
          page: payload.page,
          limit: payload.limit,
          orderBy: payload.orderBy,
        })
      ).toJSON();
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async popular(
    city: string,
    limit?: number
  ): Promise<ModelPaginatorContract<RealEstate>> {
    const popularConfig: PaginateConfig<Columns, RealEstate> = {
      limit,
      page: 1,
      orderByColumn: "viewsCount",
      orderBy: "desc",
    };

    try {
      return await RealEstate.query()
        .preload("estate")
        .whereHas("district", (query) => {
          query.where("city", city);
        })
        .get(popularConfig);
    } catch (err: Error | any) {
      throw err;
    }
  }

  public static async recommended(
    city: string,
    payload: RealEstateRecommendedValidator["schema"]["props"]
  ): Promise<RealEstate[]> {
    let user: User;
    const recommended: RealEstate[] = [];

    try {
      user = await UserService.getById(payload.userId, {
        relations: ["realEstatesWishList"],
      });
    } catch (err: Error | any) {
      throw err;
    }

    try {
      if (user.realEstatesWishList.length) {
        for (let i = 0; i < payload.limit; i++) {
          const random: number = Math.floor(
            Math.random() * user.realEstatesWishList.length
          );
          const estateId: Estate["id"] =
            user.realEstatesWishList[random - 1].estateId;

          const realEstateItem: RealEstate = await RealEstate.query()
            .preload("estate")
            .where("estateId", estateId)
            .random();
          recommended.push(realEstateItem);
        }
      } else {
        const popular = await this.popular(city, payload.limit);

        for (const item of popular) {
          const realEstateItem: RealEstate = await RealEstate.query()
            .preload("estate")
            .where("estateId", item.estateId)
            .random();
          recommended.push(realEstateItem);
        }
      }

      return recommended;
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async incrementTodayViewsCount(
    item: RealEstate
  ): Promise<number> {
    const DAY_IN_SECONDS: number = 86400;
    const CURRENT_TIME: number = DateTime.now().second;
    const EXPIRATION: number = DAY_IN_SECONDS - CURRENT_TIME;

    try {
      let currentViewsCount: number = Number(await Redis.get(item.uuid));
      const incrementedViewsCount: number = ++currentViewsCount;

      await Redis.set(item.uuid, incrementedViewsCount, "EX", EXPIRATION);

      return incrementedViewsCount;
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async getUserRealEstates(
    userId: User["id"],
    config: ApiValidator["schema"]["props"]
  ): Promise<ModelPaginatorContract<RealEstate>> {
    let user: User;

    try {
      user = await UserService.getById(userId);
    } catch (err: Error | any) {
      throw err;
    }

    try {
      return await user
        .related("realEstates")
        .query()
        .preload("estate")
        .get(config);
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async getUserWishlist(
    userId: User["id"],
    config: ApiValidator["schema"]["props"]
  ): Promise<ModelPaginatorContract<RealEstate>> {
    let user: User;

    try {
      user = await UserService.getById(userId);
    } catch (err: Error | any) {
      throw err;
    }

    try {
      return await user.related("realEstatesWishList").query().get(config);
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  public static async deleteImage(
    imageId: RealEstateImage["id"]
  ): Promise<void> {
    let image: RealEstateImage | null;

    try {
      image = await RealEstateImage.find(imageId);
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.DATABASE_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }

    if (!image)
      throw {
        code: ResponseCodes.SERVER_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;

    try {
      await Drive.delete(image.image);
      await image.delete();
    } catch (err: any) {
      Logger.error(err);
      throw {
        code: ResponseCodes.SERVER_ERROR,
        message: ResponseMessages.ERROR,
      } as Error;
    }
  }

  /**
   * * Private methods
   */

  private static filter(
    payload: RealEstateGetForMapValidator["schema"]["props"],
    query: ModelQueryBuilderContract<typeof RealEstate, RealEstate>
  ): ModelQueryBuilderContract<typeof RealEstate, RealEstate> {
    for (const key in payload) {
      if (String(payload[key])) {
        switch (key) {
          // Skip this api's keys
          case "page":
          case "limit":
          case "orderBy":
            break;
          // Skip this api's keys

          case "districts": // @ts-ignore
            query = query.whereIn("districtId", payload[key]);
            break;

          case "addressOrResidentalComplex":
            query = query
              .where("residentalComplex", "ILIKE", `%${payload[key]}%`)
              .orWhere("address", "ILIKE", `%${payload[key]}%`);
            break;

          case "ceilingHeight":
          case "yearOfConstruction": // @ts-ignore
            query = query.where(key, ">=", payload[key]!);
            break;

          case "WCTypes":
          case "roomTypes":
          case "repairTypes":
          case "rentalTypes":
          case "layoutTypes":
          case "balconyTypes":
          case "elevatorTypes":
          case "houseBuildingTypes":
            query = query.whereIn(removeLastLetter(key), payload[key]!);
            break;

          case "startPrice":
          case "startFloor":
          case "startMaxFloor":
          case "startTotalArea":
          case "startLivingArea":
          case "startKitchenArea":
            query = query.where(
              removeFirstWord(key, "start"),
              ">=",
              payload[key]!
            );
            break;

          case "endPrice":
          case "endFloor":
          case "endMaxFloor":
          case "endTotalArea":
          case "endLivingArea":
          case "endKitchenArea":
            query = query.where(
              removeFirstWord(key, "end"),
              "<=",
              payload[key]!
            );
            break;

          default:
            query = query.where(key, payload[key]);
            break;
        }
      }
    }

    return query;
  }
}
