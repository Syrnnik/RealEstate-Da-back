import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SubService from "App/Models/Services/SubService";
import ExceptionService from "App/Services/ExceptionService";
import ResponseService from "App/Services/ResponseService";
import SubServiceService from "App/Services/Services/SubServiceService";
import SubServiceValidator from "App/Validators/Services/SubServiceValidator";
import { ResponseCodes, ResponseMessages } from "Contracts/response";
import { Error } from "Contracts/services";

export default class SubServicesController {
  // public async all({ response }: HttpContextContract) {
  //   try {
  //     let servicesTypes: SubServiceService[] =
  //       await SubServiceService..getAll();

  //     return response
  //       .status(200)
  //       .send(ResponseService.success(ResponseMessages.SUCCESS, servicesTypes));
  //   } catch (err: Error | any) {
  //     throw new ExceptionService(err);
  //   }
  // }

  public async get({ response, params }: HttpContextContract) {
    const id: SubService["id"] = params.id;

    try {
      const item: SubService = await SubServiceService.get(id);

      return response
        .status(200)
        .send(ResponseService.success(ResponseMessages.SUCCESS, item));
    } catch (err: Error | any) {
      throw new ExceptionService(err);
    }
  }

  public async add({ request, response }: HttpContextContract) {
    let payload: SubServiceValidator["schema"]["props"];

    try {
      payload = await request.validate(SubServiceValidator);
    } catch (err: any) {
      throw new ExceptionService({
        code: ResponseCodes.VALIDATION_ERROR,
        message: ResponseMessages.VALIDATION_ERROR,
        body: err.messages,
      });
    }

    try {
      let item: SubService = await SubServiceService.create(payload);

      return response
        .status(200)
        .send(ResponseService.success(ResponseMessages.SERVICE_CREATED, item));
    } catch (err: Error | any) {
      throw new ExceptionService(err);
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    let payload: SubServiceValidator["schema"]["props"];
    let id: SubService["id"] = params.id;

    try {
      payload = await request.validate(SubServiceValidator);
    } catch (err: any) {
      throw new ExceptionService({
        code: ResponseCodes.VALIDATION_ERROR,
        message: ResponseMessages.VALIDATION_ERROR,
        body: err.messages,
      });
    }

    try {
      let item: SubService = await SubServiceService.update(id, payload);

      return response
        .status(200)
        .send(ResponseService.success(ResponseMessages.SERVICE_UPDATED, item));
    } catch (err: Error | any) {
      throw new ExceptionService(err);
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    let id: SubService["id"] = params.id;

    try {
      await SubServiceService.delete(id);

      return response
        .status(200)
        .send(ResponseService.success(ResponseMessages.SERVICE_DELETED));
    } catch (err: Error | any) {
      throw new ExceptionService(err);
    }
  }
}
