import Role from 'App/Models/Users/Role'
import BaseService from '../BaseService'
import Logger from '@ioc:Adonis/Core/Logger'
import { Roles } from 'Config/users'
import { Error } from 'Contracts/services'
import { ResponseCodes, ResponseMessages } from 'Contracts/response'

export default class RoleService extends BaseService {
  public static async getAll(): Promise<Role[]> {
    try {
      return await Role.all()
    } catch (err: any) {
      Logger.error(err)
      throw { code: ResponseCodes.DATABASE_ERROR, message: ResponseMessages.ERROR } as Error
    }
  }

  public static async get(name: Roles): Promise<Role> {
    try {
      return (await Role.findBy('name', name))!
    } catch (err: any) {
      Logger.error(err)
      throw { code: ResponseCodes.DATABASE_ERROR, message: ResponseMessages.ROLE_NOT_FOUND } as Error
    }
  }
}
