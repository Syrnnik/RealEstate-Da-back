import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelObject, ModelQueryBuilderContract } from "@ioc:Adonis/Lucid/Orm";
import RealEstate from "App/Models/RealEstates/RealEstate";
import Service from "App/Models/Services/Service";
import User from "App/Models/Users/User";
import ExceptionService from "App/Services/ExceptionService";
import ResponseService from "App/Services/ResponseService";
import UserService from "App/Services/Users/UserService";
import UserValidator from "App/Validators/Api/Users/User";
import { ResponseCodes, ResponseMessages } from "Contracts/response";
import { Error } from "Contracts/services";

export default class UsersController {
  public async get({ params, response }: HttpContextContract) {
    const id: User["id"] = params.id;
    const currentUserId: User["id"] | undefined = params.currentUserId;

    try {
      let item: User | ModelObject = await UserService.getById(id);

      await item.load(
        "realEstates",
        (query: ModelQueryBuilderContract<typeof RealEstate>) => {
          query.preload("estate");
        }
      );

      await item.load(
        "services",
        (query: ModelQueryBuilderContract<typeof Service>) => {
          query
            .preload("labels")
            .preload("subServices", (query) => {
              query.preload("service");
            })
            .preload("images");
        }
      );

      if (currentUserId) item = await item.getForUser(currentUserId);

      return response
        .status(200)
        .send(ResponseService.success(ResponseMessages.SUCCESS, item));
    } catch (err: Error | any) {
      throw new ExceptionService(err);
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    let payload: UserValidator["schema"]["props"];
    const uuid: User["uuid"] = params.uuid;

    try {
      payload = await request.validate(UserValidator);
    } catch (err: any) {
      throw new ExceptionService({
        code: ResponseCodes.VALIDATION_ERROR,
        message: ResponseMessages.VALIDATION_ERROR,
        body: err.messages,
      });
    }

    try {
      const item: User = await UserService.update(uuid, payload);

      return response
        .status(200)
        .send(ResponseService.success(ResponseMessages.USER_UPDATED, item));
    } catch (err: Error | any) {
      throw new ExceptionService(err);
    }
  }

  public async deleteAvatar({ params, response }: HttpContextContract) {
    const uuid: User["uuid"] = params.uuid;

    try {
      const item: User = await UserService.deleteAvatar(uuid);

      return response
        .status(200)
        .send(
          ResponseService.success(ResponseMessages.USER_AVATAR_DELETED, item)
        );
    } catch (err: Error | any) {
      throw new ExceptionService(err);
    }
  }
}
