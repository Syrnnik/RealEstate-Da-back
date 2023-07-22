import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import BaseValidator from "../BaseValidator";

export default class CallRieltorValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super();
  }

  public schema = schema.create({
    name: schema.string({}, [rules.minLength(1), rules.maxLength(255)]),
    phone: schema.string({}, [rules.mobile()]),
    desc: schema.string({}, [rules.minLength(1)]),
  });

  public messages = this.messages;
}
