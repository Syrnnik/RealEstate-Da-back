import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import BaseValidator from "../BaseValidator";

// import { ExperienceTypes } from 'Contracts/services'

export default class ServiceValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super();
  }

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    userId: schema.number([
      rules.unsigned(),
      rules.exists({ table: "users", column: "id" }),
    ]),
    // experienceType: schema.number([
    //   rules.unsigned(),
    //   rules.range(ExperienceTypes.BEFORE_ONE_YEAR, ExperienceTypes.BEFORE_TEN_YEAR),
    // ]),
    description: schema.string({}, [rules.maxLength(1024), rules.minLength(5)]),
    isBanned: schema.boolean.optional(),
    serviceTypeId: schema.number([rules.unsigned()]),
    subServices: schema.array().members(schema.number([rules.unsigned()])),
    servicesTypesAttributeId: schema.number.optional([rules.unsigned()]),
    labels: schema.string.optional({}, []),
    images: schema.array.optional().members(
      schema.file.optional({
        extnames: ["jpg", "jpeg", "png", "webp"],
      })
    ),
    district: schema.object().members({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
      city: schema.string({ trim: true }, [rules.maxLength(255)]),
    }),
    address: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(255),
    ]),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = this.messages;
}
