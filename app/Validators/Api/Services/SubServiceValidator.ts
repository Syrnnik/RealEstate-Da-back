import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import ApiValidator from "../ApiValidator";

export default class SubServiceValidator extends ApiValidator {
  constructor(protected ctx: HttpContextContract) {
    super();
  }

  public schema = schema.create({
    ...this.preParsedSchema,
    serviceId: schema.number([rules.unsigned()]),
    serviceTypeSubServiceId: schema.number([rules.unsigned()]),
  });

  public messages = this.messages;
}
