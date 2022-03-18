// eslint-disable-next-line max-len

import { createWebHistory, createWebHashHistory, createMemoryHistory, createRouter } from 'vue-router'
import config, { Variable, Property, RouterMode } from '@/config'
import routes, { RouteNames } from '@/router/routes'
import getStore from '@/store'
import { CHANGE_LOCALE } from '@/store/modules/Application'

const isLocaleEnabled = config.variables[Variable.LOCALE_ENABLED] && config.variables[Variable.LOCALE_ROUTING_ENABLED]
const defaultLocale = config.properties[Property.DEFAULT_LOCALE]
const availableLanguages = config.properties[Property.AVAILABLE_LOCALES]
let currentLocale = defaultLocale

if (!isLocaleEnabled) {
  routes.push({
    path: ':catchAll(.*)*',
    redirect: () => ({
      name: RouteNames.NOT_FOUND,
      params: { lang: defaultLocale }
    })
  })

  routes.forEach((route) => {
    // eslint-disable-next-line no-param-reassign
    route.path = `/${route.path}`
  })
}

const parsedRoutes = !isLocaleEnabled
  ? routes
  : [
      {
        path: '/:lang',
        component: { template: '<router-view />' },
        children: routes
      }
      /*
      {
        path: '/:catchAll(.*)*',
        redirect: () => ({
          name: RouteNames.NOT_FOUND,
          params: { lang: defaultLocale }
        })
      }
      */
    ]

const getHistoryMode = () => {
  if (config.properties[Property.ROUTER_MODE] === RouterMode.HISTORY) return createWebHistory()
  return createWebHashHistory()
}

const router = createRouter({
  // eslint-disable-next-line max-len
  history: !config.variables[Variable.LOCALE_ROUTING_ENABLED] ? createMemoryHistory() : getHistoryMode(),
  routes: parsedRoutes
})

if (isLocaleEnabled) {
  const store = getStore()
  router.beforeEach(async (to, from, next) => {
    if (to.params.lang && availableLanguages.includes(to.params.lang)) {
      currentLocale = to.params.lang
      store.dispatch(CHANGE_LOCALE, currentLocale)
      next()
    } else if (to.fullPath === '/') {
      router.replace({ name: RouteNames.HOMEPAGE, params: { lang: defaultLocale } })
    } else {
      router.replace({ name: RouteNames.NOT_FOUND, params: { lang: currentLocale } })
    }
  })
}

export default router
