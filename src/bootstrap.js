import '../style/tailwind.scss'
import '../style/main.scss'

import { createApp } from 'vue'
import router from '@/router'
import { RouteNames } from '@/router/routes'
import getStore from '@/store'
import i18nSetup, { loadLocale } from '@/plugins/i18n'
import InstallPlugin from '@/utils/InstallPlugin'
import RegisterPlugin from '@/utils/RegisterPlugin'
import WaitForStylesheetsLoaded from '@/utils/WaitForStylesheetsLoaded'
import { getVersioned, getStatic } from '@/utils/AssetPath'
import config, { Property, Variable, Environment } from '@/config'
import $eventBus, { Events } from '@/events'
import { SET_LOCALE } from '@/store/modules/Application'
import components from '@/components'
import App from './app/App.vue'

// Service worker (works only in production mode)
require('@/utils/ServiceWorker')

const store = getStore()
const app = createApp(App)

// Register global directives and components
RegisterPlugin.registerComponents(app, components)

const $devMode = process.env.NODE_ENV === Environment.DEVELOPMENT

const startup = async () => {
  // store the current locale
  store.commit(SET_LOCALE, config.properties[Property.DEFAULT_LOCALE])

  app.use(InstallPlugin, {
    $vRoot: config.variables[Variable.VERSIONED_STATIC_ROOT],
    $sRoot: config.variables[Variable.STATIC_ROOT],
    $eventBus,
    $devMode,
    Events,
    RouteNames,
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
