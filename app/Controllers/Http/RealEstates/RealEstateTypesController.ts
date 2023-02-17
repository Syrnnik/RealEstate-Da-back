import RealEstateType from 'App/Models/RealEstates/RealEstateType'
import RealEstateTypeService from 'App/Services/RealEstates/RealEstateTypeService'
import RealEstateTypeValidator from 'App/Validators/RealEstates/RealEstateTypeValidator'
import { Error } from 'Contracts/services'
import { ResponseMessages } from 'Contracts/response'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RealEstateTypesController {
  public async index({ view }: HttpContextContract) {
    let realEstateTypes: RealEstateType[] = await RealEstateTypeService.getAll()

    return view.render('pages/realEstateTypes/index', { realEstateTypes })
  }

  public async show({ view, response, params, session }: HttpContextContract) {
    let slug: RealEstateType['slug'] = params.id

    try {
      let item: RealEstateType = await RealEstateTypeService.get(slug)

      return view.render('pages/realEstateTypes/show', { item })
    } catch (err: Error | any) {
      session.flash('error', err.message)
      return response.redirect().back()
    }
  }

  public async edit({ view, response, params, session }: HttpContextContract) {
    let slug: RealEstateType['slug'] = params.id

    try {
      let item: RealEstateType = await RealEstateTypeService.get(slug)

      return view.render('pages/realEstateTypes/edit', { item })
    } catch (err: Error | any) {
      session.flash('error', err.message)
      return response.redirect().back()
    }
  }

  public async update({ request, response, session, params }: HttpContextContract) {
    let slug: RealEstateType['slug'] = params.id
    let payload = await request.validate(RealEstateTypeValidator)

    try {
      await RealEstateTypeService.update(slug, payload)

      session.flash('success', ResponseMessages.REAL_ESTATE_TYPES_UPDATED)
      return response.redirect().toRoute('real_estate_types.index')
    } catch (err: Error | any) {
      session.flash('error', err.message)
      return response.redirect().back()
    }
  }
}
