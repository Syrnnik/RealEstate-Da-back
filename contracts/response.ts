export type ResponseApiError = {
  status: number,
  message: string,
  code: ResponseCodes,
  body?: {
    [key: string]: any
  }
}

export enum ResponseCodes {
  SUCCESS = 'SUCCESS',

  CLIENT_ERROR = 'CLIENT_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  MAILER_ERROR = 'MAILER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
}

export enum ResponseMessages {
  SUCCESS = 'Успешно!',
  CITY_UNDEFINED = 'Город пустой!',

  USER_UPDATED = 'Данные пользователя были успешно изменены!',
  USER_UNBLOCKED = 'Пользователь был успешно разблокирован!',
  USER_ACTIVATED = 'Вы успешно активировали свой аккаунт!',
  USER_SEND_REMEMBER_PASSWORD_LINK = 'Дальнейшие инструкции были отправлены на вашу почту, спасибо!',
  USER_CHANGED_PASSWORD = 'Ваш пароль был успешно изменен!',
  USER_BLOCKED = 'Пользователь был успешно заблокирован!',
  USER_LOGIN = 'Вы успешно вошли в свой аккаунт!',
  USER_LOGOUT = 'Вы успешно вышли из своего аккаунта!',
  USER_AVATAR_IS_EMPTY = 'Аватарка пользователя не найдена!',
  USER_AVATAR_DELETED = 'Аватарка пользователя была успешно удалена!',

  NEWS_CREATED = 'Новость была успешно создана и опубликована!',
  NEWS_UPDATED = 'Новость была успешно обновлена!',
  NEWS_DELETED = 'Новость была успешно удалена!',
  NEWS_NOT_FOUND = 'Новость не найдена!',

  BANNER_CREATED = 'Баннер был успешно создан!',
  BANNER_UPDATED = 'Баннер был успешно обновлен!',
  BANNER_DELETED = 'Баннер был успешно удален!',
  BANNER_NOT_FOUND = 'Баннер не найден!',

  QUESTION_CREATED = 'Ваш вопрос был отправлен, спасибо!',
  QUESTION_DELETED = 'Вопрос был успешно удален!',
  QUESTION_NOT_FOUNT = 'Вопрос не найден!',

  CALL_RIELTOR_CREATED = 'Ваш запрос был отправлен, спасибо!',
  CALL_RIELTOR_DELETED = 'Запрос был успешно удален!',
  CALL_RIELTOR_NOT_FOUNT = 'Запрос не найден!',

  REAL_ESTATE_TYPES_CREATED = 'Тип недвижимости был успешно создана и опубликован!',
  REAL_ESTATE_TYPES_UPDATED = 'Тип недвижимости был успешно обновлен!',
  REAL_ESTATE_TYPES_DELETED = 'Тип недвижимости был успешно удален!',
  REAL_ESTATE_TYPES_NOT_FOUND = 'Тип недвижимости не найден!',

  SERVICES_TYPES_CREATED = 'Тип услуги был успешно создан и опубликован!',
  SERVICES_TYPES_UPDATED = 'Тип услуги был успешно обновлен!',
  SERVICES_TYPES_DELETED = 'Тип услуги был успешно удален!',
  SERVICES_TYPES_NOT_FOUND = 'Тип услуги не найден!',

  SERVICE_CREATED = 'Услуга была успешно создана и опубликована!',
  SERVICE_UPDATED = 'Услуга была успешно обновлена!',
  SERVICE_DELETED = 'Услуга была успешно удалена!',
  SERVICE_NOT_FOUND = 'Услуга не найдена!',
  SERVICE_TYPE_DIFFERENT = 'Тип услуги должен быть одинаковый у всех услуг!',

  ESTATE_CREATED = 'Объект был успешно создан и опубликован!',
  ESTATE_UPDATED = 'Объект был успешно обновлен!',
  ESTATE_DELETED = 'Объект был успешно удален!',
  ESTATE_NOT_FOUND = 'Объект не найден!',

  LABEL_CREATED = 'Предоставляемая услуга была успешно создана и опубликована!',
  LABEL_UPDATED = 'Предоставляемая услуга была успешно обновлена!',
  LABEL_DELETED = 'Предоставляемая услуга была успешно удалена!',
  LABEL_NOT_FOUND = 'Предоставляемая услуга не найдена!',

  REAL_ESTATE_CREATED = 'Объявление было успешно создано и опубликовано!',
  REAL_ESTATE_UPDATED = 'Объявление было успешно обновлено!',
  REAL_ESTATE_DELETED = 'Объявление было успешно удалено!',
  REAL_ESTATE_NOT_FOUND = 'Объявление не найдено!',
  REAL_ESTATE_BLOCKED = 'Объявление было заблокировано!',
  REAL_ESTATE_UNBLOCKED = 'Объявление было разблокировано!',

  REAL_ESTATES_REPORT_CREATED = 'Жалоба на объявление была успешно создана!',
  REAL_ESTATES_REPORT_DELETED = 'Жалоба на объявление была успешно удалена!',
  REAL_ESTATES_REPORT_NOT_FOUND = 'Жалоба на объявление не была найдена!',

  REAL_ESTATES_WISHLIST_CREATED = 'Объявление было успешно добавлено в избранное!',
  REAL_ESTATES_WISHLIST_DELETED = 'Объявление было успешно удалено из избранного!',

  USERS_REPORT_CREATED = 'Жалоба на пользователя была успешно подана!',
  USERS_REPORT_DELETED = 'Жалоба на пользователя была успешно удалена!',
  USERS_REPORT_NOT_FOUND = 'Жалоба на пользователя не была найдена!',

  USERS_REVIEW_CREATED = 'Отзыв на пользователя был успешно создан!',
  USERS_REVIEW_UPDATED = 'Отзыв на пользователя был успешно обновлен!',
  USERS_REVIEW_DELETED = 'Отзыв на пользователя был успешно удален!',
  USERS_REVIEW_NOT_FOUND = 'Отзыв на пользователя не был найден!',

  USERS_REVIEWS_REPORT_CREATED = 'Жалоба на отзыв пользователя была успешно подана!',
  USERS_REVIEWS_REPORT_DELETED = 'Жалоба на отзыв пользователя была успешно удалена!',
  USERS_REVIEWS_REPORT_NOT_FOUND = 'Жалоба на отзыв пользователя не была найдена!',

  NOT_REGISTERED = 'Пользователь не зарегистрирован',
  NOT_ADMIN = 'Вы не являетесь администратором!',
  ALREADY_ACTIVATED = 'Пользователь уже активировал свой аккаунт!',
  REGISTER_SUCCESS = 'Вы успешно зарегистрировались, заявка на подтверждение аккаунта была отправлена на вашу почту!',

  ERROR = 'Что-то пошло не так, повторите попытку еще раз!',
  VALIDATION_ERROR = 'Заполните пожалуйста все поля правильно!',

  USER_NOT_FOUND = 'Пользователь не найден!',
  ROLE_NOT_FOUND = 'Роль не найдена!',
  EMAIL_NOT_FOUND = 'Почта не найдена!',

  IP_NOT_FOUND = 'IP пользователя не установлен!',
  UA_NOT_FOUND = 'User-Agent пользователя не установлен!',
  FINGERPRINT_NOT_FOUND = 'Fingerprint пользователя не установлен!',

  TOKEN_EXPIRED = 'Ваша сессия истекла!',
  TOKEN_SUCCESS = 'Токен успешно обновлен!',

  SOCKET_USER_ID_UNDEFINED = 'ID пользователя при соединении не определен!',
}

export enum ResponsesStatusTypes {
  UNDER_CONSIDERATION = 0,
  IN_PROCESS = 1,
  COMPLETED = 2,
}
