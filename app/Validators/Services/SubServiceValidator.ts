import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import BaseValidator from "../BaseValidator";

export default class SubServiceValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super();
  }

  public schema = schema.create({
    serviceId: schema.number([rules.unsigned()]),
    serviceTypeSubServiceId: schema.number([rules.unsigned()]),
  });

  public messages = this.messages;
}
