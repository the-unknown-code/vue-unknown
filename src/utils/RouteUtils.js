/* eslint-disable no-param-reassign */
import { getLocale } from '@/plugins/i18n'

export default (route) => {
  const locale = getLocale() ? { lang: getLocale() } : null

  if (locale) {
    const { params } = route
    if (params) {
      route.params = { ...params, ...locale }
    } else {
      route.params = { ...locale }
    }
  }

  return route
}
