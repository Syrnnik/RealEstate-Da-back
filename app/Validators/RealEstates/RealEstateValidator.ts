import BaseValidator from '../BaseValidator'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  AreaType,
  BalconyTypes, BuildingTypes, DirectionTypes, ElevatorTypes, EstateTypes, GradeTypes, HouseBuildingTypes,
  HouseTypes, LayoutTypes, LocationTypes, OutBuildingTypes, PrepaymentTypes, RentalPeriodTypes,
  RentalTypes, RepairTypes, RoomsTypes, SaleTypes, SellersTypes, TransactionTypes, WCTypes,
  Window, WindowTypes, WindRoseDirectionTypes,
} from 'Contracts/enums'

export default class RealEstateValidator extends BaseValidator {
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
    estateId: schema.number([
      rules.unsigned(),
      rules.exists({ table: 'estates', column: 'id' }),
    ]),
    userId: schema.number([
      rules.unsigned(),
      rules.exists({ table: 'users', column: 'id' }),
    ]),
    transactionType: schema.number([
      rules.unsigned(),
      rules.range(0, TransactionTypes.ONLY_RENT),
    ]),
    rentalPeriod: schema.number([
      rules.unsigned(),
      rules.range(0, RentalPeriodTypes.SHORT_TIME),
    ]),
    pledge: schema.number([
      rules.unsigned(),
    ]),
    commission: schema.number([
      rules.unsigned(),
      rules.range(0, 100),
    ]),
    address: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    district: schema.object().members({
      name: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
      city: schema.string({ trim: true }, [
        rules.maxLength(255),
      ])
    }),
    latitude: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    longitude: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    houseType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, HouseTypes.COMMERCIAL_APARTMENT),
    ]),
    roomType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, RoomsTypes.FREE),
    ]),
    totalArea: schema.number.optional([ rules.unsigned() ]),
    floor: schema.number.optional([ rules.unsigned() ]),
    WCType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, WCTypes.TWO_OR_MORE),
    ]),
    balconyType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, BalconyTypes.SEVERAL),
    ]),
    layoutType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, LayoutTypes.ISOLATED_ADJACENT),
    ]),
    window: schema.number.optional([
      rules.unsigned(),
      rules.range(0, Window.SEVERAL),
    ]),
    windowType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, WindowTypes.SPECIAL),
    ]),
    repairType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, RepairTypes.NO_REPAIR),
    ]),
    outBuildingType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, OutBuildingTypes.OUT_BUILDING),
    ]),
    windRoseDirectionType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, WindRoseDirectionTypes.SOUTH_WEST),
    ]),
    directionType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, DirectionTypes.TRANS),
    ]),
    gradeType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, GradeTypes.D),
    ]),
    buildingType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, BuildingTypes.OTHER),
    ]),
    locationType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, LocationTypes.COOPERATIVE),
    ]),
    isCountersSeparately: schema.boolean.optional(),
    hasKitchenFurniture: schema.boolean.optional(),
    hasFurniture: schema.boolean.optional(),
    hasRefrigerator: schema.boolean.optional(),
    hasWashingMachine: schema.boolean.optional(),
    hasDishWasher: schema.boolean.optional(),
    hasTv: schema.boolean.optional(),
    hasConditioner: schema.boolean.optional(),
    hasInternet: schema.boolean.optional(),
    hasBathroom: schema.boolean.optional(),
    hasShowerCabin: schema.boolean.optional(),
    withKids: schema.boolean.optional(),
    withPets: schema.boolean.optional(),
    hasRamp: schema.boolean.optional(),
    hasGarbage: schema.boolean.optional(),
    hasGroundParking: schema.boolean.optional(),
    hasUnderGroundParking: schema.boolean.optional(),
    hasMoreLayerParking: schema.boolean.optional(),
    hasYardParking: schema.boolean.optional(),
    hasBarrierParking: schema.boolean.optional(),
    hasBasement: schema.boolean.optional(),
    hasVentilation: schema.boolean.optional(),
    hasFireAlarm: schema.boolean.optional(),
    hasSecurityAlarm: schema.boolean.optional(),
    hasSecurity: schema.boolean.optional(),
    isMortgage: schema.boolean.optional(),
    isEncumbrances: schema.boolean.optional(),
    description: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(4096),
    ]),
    houseBuildingType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, HouseBuildingTypes.MIXED),
    ]),
    elevatorType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, ElevatorTypes.PASSENGER_CARGO),
    ]),
    sellerType: schema.number([
      rules.unsigned(),
      rules.range(0, SellersTypes.NOT_IMPORTANT),
    ]),
    saleType: schema.number([
      rules.unsigned(),
      rules.range(0, SaleTypes.NOT_IMPORTANT),
    ]),
    price: schema.number([
      rules.unsigned(),
    ]),
    estateType: schema.number.optional([
      rules.unsigned(),
      rules.range(EstateTypes.NEW_BUILDING, EstateTypes.OLD_BUILDING),
    ]),
    areaType: schema.number.optional([
      rules.unsigned(),
      rules.range(AreaType.SNT, AreaType.LPX),
    ]),
    landArea: schema.number.optional([ rules.unsigned() ]),
    isVip: schema.boolean.optional(),
    isHot: schema.boolean.optional(),
    prepaymentType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, PrepaymentTypes.YEAR),
    ]),
    rentalType: schema.number.optional([
      rules.unsigned(),
      rules.range(0, RentalTypes.DAILY),
    ]),
    communalPrice: schema.number.optional([
      rules.unsigned(),
    ]),
    residentalComplex: schema.string.optional({ trim: true }, [
      rules.maxLength(255),
    ]),
    livingArea: schema.number.optional([
      rules.unsigned(),
    ]),
    kitchenArea: schema.number.optional([
      rules.unsigned(),
    ]),
    maxFloor: schema.number.optional([ rules.unsigned() ]),
    acres: schema.number.optional([ rules.unsigned() ]),
    cityDistance: schema.number.optional([ rules.unsigned() ]),
    yearOfConstruction: schema.date.optional({ format: 'yyyy' }, [
      rules.before('today'),
    ]),
    ceilingHeight: schema.number.optional([
      rules.unsigned(),
      rules.range(0, 100),
    ]),
    image: schema.file.optional({
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    }),
    images: schema.array.optional().members(
      schema.file.optional({
        extnames: ['jpg', 'jpeg', 'png', 'webp'],
      })
    ),
    cadastralNumber: schema.string.optional({ trim: true }),
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
  public messages = {
    ...this.messages,
    'yearOfConstruction.before': 'Значение должно быть не выше сегодняшнего дня!'
  }
}
