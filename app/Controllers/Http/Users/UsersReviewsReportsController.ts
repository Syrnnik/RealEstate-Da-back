import UsersReviewsReport from 'App/Models/Users/UsersReviewsReport'
import UsersReviewsReportService from 'App/Services/Users/UsersReviewsReportService'
import { ResponseMessages } from 'Contracts/response'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersReviewsReportsController {
  public async index({ route, request, view }: HttpContextContract) {
    let baseURL: string = route!.pattern
    let page: number = request.input('page', 1)

    let columns: typeof UsersReviewsReport['columns'][number][] = ['id', 'usersReviewId', 'userId', 'createdAt']
    let reports: UsersReviewsReport[] = await UsersReviewsReportService.paginate({ baseURL, page, relations: ['user', 'usersReview'] }, columns)

    return view.render('pages/usersReviewsReports', { reports })
  }

  public async destroy({ params, response, session }: HttpContextContract) {
    let id: UsersReviewsReport['id'] = params.id

    try {
      await UsersReviewsReportService.deleteById(id)

      session.flash('success', ResponseMessages.USERS_REVIEWS_REPORT_DELETED)
    } catch (err: Error | any) {
      session.flash('error', err.message)
    }

    return response.redirect().back()
  }
}
