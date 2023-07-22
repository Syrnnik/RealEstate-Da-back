import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CallRieltor from "App/Models/CallRieltor";
import CallRieltorService from "App/Services/CallRieltorService";
import ExceptionService from "App/Services/ExceptionService";
import ResponseService from "App/Services/ResponseService";
import CallRieltorValidator from "App/Validators/Api/CallRieltorValidator";
import { ResponseCodes, ResponseMessages } from "Contracts/response";

export default class CallRieltorsController {
  public async create({ request, response }: HttpContextContract) {
    let payload: CallRieltorValidator["schema"]["props"];

    try {
      payload = await request.validate(CallRieltorValidator);
    } catch (err: any) {
      throw new ExceptionService({
        code: ResponseCodes.VALIDATION_ERROR,
        message: ResponseMessages.VALIDATION_ERROR,
        body: err.messages,
      });
    }

    try {
      let item: CallRieltor = await CallRieltorService.create(payload);

      return response
        .status(200)
        .send(
          ResponseService.success(ResponseMessages.CALL_RIELTOR_CREATED, item)
        );
    } catch (err: Error | any) {
      throw new ExceptionService(err);
    }
  }
}
