import '../style/tailwind.scss'
import '../style/main.scss'

import axios from 'axios'
import { createApp } from 'vue'
import { sync } from 'vuex-router-sync'
import router from '@/router'
import { RouteNames } from '@/router/routes'
import getStore from '@/store'
import i18nSetup, { loadLocale } from '@/plugins/i18n'
import vueHead from '@/plugins/vue-head'
import InstallPlugin from '@/utils/InstallPlugin'
import RegisterPlugin from '@/utils/RegisterPlugin'
import WaitForStylesheetsLoaded from '@/utils/WaitForStylesheetsLoaded'
import createPath from '@/utils/RouteUtils'
import { getVersioned, getStatic } from '@/utils/AssetPath'
import MediaTracker, { MediaState } from '@/utils/MediaTracker'
import config, { Property, Variable, Environment, Theme } from '@/config'
import $eventBus, { Events } from '@/events'
import { SET_LOCALE, SET_THEME_MODE } from '@/store/modules/Application'
import directives from '@/directives'
import components from '@/components'
import App from './app/App.vue'

// Service worker (works only in production mode)
require('@/utils/ServiceWorker')

const store = getStore()
const app = createApp(App)

// Register global directives and components
RegisterPlugin.registerDirectives(app, directives)
RegisterPlugin.registerComponents(app, components)

const $devMode = process.env.NODE_ENV === Environment.DEVELOPMENT
const startup = async () => {
  sync(store, router)

  // store theme mode
  store.commit(SET_THEME_MODE, config.variables[Variable.THEME_MODE])

  // store the current locale
  store.commit(SET_LOCALE, config.properties[Property.DEFAULT_LOCALE])

  app.use(vueHead)
  app.use(InstallPlugin, {
    $http: axios,
    $vRoot: config.variables[Variable.VERSIONED_STATIC_ROOT],
    $sRoot: config.variables[Variable.STATIC_ROOT],
    $mediaTracker: new MediaTracker(store),
    $eventBus,
    $devMode,
    Events,
    Theme,
    RouteNames,
    MediaState,
    createPath,
    getVersioned,
    getStatic
  })

  if ($devMode) await WaitForStylesheetsLoaded(document)
  app.use(store).use(router).mount('#app')
}

i18nSetup().then((i18n) => {
  app.use(i18n)
  loadLocale(config.properties[Property.DEFAULT_LOCALE]).then(startup)
})
