import Estate from './Estate'
import CamelCaseNamingStrategy from '../../../start/CamelCaseNamingStrategy'
import { DateTime } from 'luxon'
import { camelCase } from '../../../helpers'
import { BaseModel, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class RealEstateType extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()
  public static readonly columns = ['id', 'slug', 'name', 'createdAt', 'updatedAt'] as const

  @column({ isPrimary: true })
  public id: number

  @column()
  public slug: string

  @column()
  public name: string

  @column.dateTime({
    autoCreate: true,
    serializeAs: null,
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: null,
  })
  public updatedAt: DateTime

  @beforeSave()
  public static async setSlug(realEstateType: RealEstateType) {
    if (realEstateType.$dirty.slug)
      realEstateType.slug = camelCase(realEstateType.slug)

    if (!realEstateType.slug)
      realEstateType.slug = camelCase(realEstateType.name)
  }

  @hasMany(() => Estate)
  public estates: HasMany<typeof Estate>
}
