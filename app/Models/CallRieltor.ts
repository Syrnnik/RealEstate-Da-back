import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import CamelCaseNamingStrategy from '../../start/CamelCaseNamingStrategy'

export default class CallRieltor extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()
  public static readonly columns = ['id', 'name', 'phone', 'desc', 'createdAt', 'updatedAt'] as const

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public phone: string

  @column()
  public desc: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: null,
  })
  public updatedAt: DateTime

  @computed()
  public get createdAtForUser(): string {
    return this.createdAt.setLocale('ru-RU').toFormat('dd.MM.yy')
  }
}
