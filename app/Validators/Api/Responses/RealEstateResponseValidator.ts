import BaseValidator from 'App/Validators/BaseValidator'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RESPONSES_DESCRIPTION_MAX_LENGTH } from 'Config/response'

export default class RealEstateResponseValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
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
    images: schema.array.optional().members(schema.file({ extnames: ['jpg', 'gif', 'png', 'jpeg', 'webp'] })),
    description: schema.string.optional({ trim: true }, [ rules.maxLength(RESPONSES_DESCRIPTION_MAX_LENGTH) ]),
    userId: schema.number([
      rules.unsigned(),
      rules.exists({ table: 'users', column: 'id' }),
    ]),
    serviceId: schema.number([
      rules.unsigned(),
      rules.exists({ table: 'services', column: 'id' }),
    ]),
    realEstateId: schema.number([
      rules.unsigned(),
      rules.exists({ table: 'realEstates', column: 'id' }),
    ]),
  })

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
  public messages = this.messages
}
