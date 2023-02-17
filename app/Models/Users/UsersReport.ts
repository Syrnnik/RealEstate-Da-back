import User from './User'
import CamelCaseNamingStrategy from '../../../start/CamelCaseNamingStrategy'
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class UsersReport extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()
  public static readonly columns = ['id', 'fromId', 'toId', 'createdAt', 'updatedAt'] as const

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'from_id' })
  public fromId: User['id']

  @column({ columnName: 'to_id' })
  public toId: User['id']

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get createdAtForUser(): string {
    return this.createdAt ? this.createdAt.setLocale('ru-RU').toFormat('d MMMM, yyyy') : 'Не установлено'
  }

  @belongsTo(() => User, {
    foreignKey: 'fromId',
  })
  public from: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'toId',
  })
  public to: BelongsTo<typeof User>
}
