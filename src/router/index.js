import { createWebHistory, createMemoryHistory, createRouter } from 'vue-router'
import config, { Variable, Property } from '@/config'
import routes, { RouteNames } from '@/router/routes'
import getStore from '@/store'
import { CHANGE_LOCALE } from '@/store/modules/Application'

// eslint-disable-next-line max-len

const isLocaleEnabled = config.variables[Variable.LOCALE_ENABLED] && config.variables[Variable.LOCALE_ROUTING_ENABLED]
const defaultLocale = config.properties[Property.DEFAULT_LOCALE]
const availableLanguages = config.properties[Property.AVAILABLE_LOCALES]

/*
routes.push({
  path: ':catchAll(.*)*',
  redirect: () => ({
    name: RouteNames.HOMEPAGE,
    params: { lang: defaultLocale }
  })
})
*/

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
      },
      {
        path: '/:catchAll(.*)*',
        redirect: () => ({
          name: RouteNames.NOT_FOUND,
          params: { lang: defaultLocale }
        })
      }
    ]

const router = createRouter({
  // eslint-disable-next-line max-len
  history: !config.variables[Variable.LOCALE_ROUTING_ENABLED] ? createMemoryHistory() : createWebHistory(),
  routes: parsedRoutes
})

if (isLocaleEnabled) {
  const store = getStore()
  router.beforeEach(async (to, from, next) => {
    if (to.params.lang && availableLanguages.includes(to.params.lang)) {
      store.dispatch(CHANGE_LOCALE, to.params.lang)
      next()
    } else {
      // next({ name: RouteNames.NOT_FOUND })
      router.replace({ name: RouteNames.NOT_FOUND, params: { lang: defaultLocale } })
    }
  })
}

export default router
