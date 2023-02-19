import Estate from 'App/Models/RealEstates/Estate'
import EstateService from 'App/Services/RealEstates/EstateService'
import RealEstateType from 'App/Models/RealEstates/RealEstateType'
import EstateValidator from 'App/Validators/RealEstates/EstateValidator'
import RealEstateTypeService from 'App/Services/RealEstates/RealEstateTypeService'
import { Error } from 'Contracts/services'
import { ResponseMessages } from 'Contracts/response'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EstatesController {
  public async index({ request, view, route }: HttpContextContract) {
    let page: number = request.input('page', 1)
    let baseURL: string = route!.pattern

    let columns: typeof Estate['columns'][number][] = ['id', 'name', 'slug', 'realEstateTypeId']
    let estates: Estate[] = await EstateService.paginate({ baseURL, page, relations: ['realEstateType'] }, columns)

    return view.render('pages/estates/index', { estates })
  }

  public async create({ view }: HttpContextContract) {
    let realEstateTypes: RealEstateType[] = await RealEstateTypeService.getAll()

    return view.render('pages/estates/create', { realEstateTypes })
  }

  public async store({ request, response, session }: HttpContextContract) {
    let payload = await request.validate(EstateValidator)

    try {
      await EstateService.create(payload)

      session.flash('success', ResponseMessages.ESTATE_CREATED)
      return response.redirect().toRoute('estates.index')
    } catch (err: Error | any) {
      session.flash('error', err.message)
      return response.redirect().back()
    }
  }

  public async show({ view, params, session, response }: HttpContextContract) {
    let slug: Estate['slug'] = params.id

    try {
      let item: Estate = await EstateService.get(slug, { relations: ['realEstateType'] })

      return view.render('pages/estates/show', { item })
    } catch (err: Error | any) {
      session.flash('error', err.message)
      return response.redirect().back()
    }
  }

  public async edit({ view, params, session, response }: HttpContextContract) {
    let slug: Estate['slug'] = params.id

    try {
      let realEstateTypes: RealEstateType[] = await RealEstateTypeService.getAll()
      let item: Estate = await EstateService.get(slug)

      return view.render('pages/estates/edit', { item, realEstateTypes })
    } catch (err: Error | any) {
      session.flash('error', err.message)
      return response.redirect().back()
    }
  }

  public async update({ request, response, session, params }: HttpContextContract) {
    let slug: Estate['slug'] = params.id
    let payload = await request.validate(EstateValidator)

    try {
      await EstateService.update(slug, payload)

      session.flash('success', ResponseMessages.ESTATE_UPDATED)
      return response.redirect().toRoute('estates.index')
    } catch (err: Error | any) {
      session.flash('error', err.message)
      return response.redirect().back()
    }
  }

  public async destroy({ params, response, session }: HttpContextContract) {
    let slug: Estate['slug'] = params.id

    try {
      await EstateService.delete(slug)

      session.flash('success', ResponseMessages.ESTATE_DELETED)
    } catch (err: Error | any) {
      session.flash('error', err.message)
    }

    return response.redirect().back()
  }
}
