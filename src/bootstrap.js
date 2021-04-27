import '../style/tailwind.scss'
import '../style/main.scss'

import axios from 'axios'
import { createApp } from 'vue'
import router from '@/router'
import { RouteNames } from '@/router/routes'
import getStore from '@/store'
import i18nSetup, { loadLocale } from '@/plugins/i18n'
import InstallPlugin from '@/utils/InstallPlugin'
import RegisterPlugin from '@/utils/RegisterPlugin'
import WaitForStylesheetsLoaded from '@/utils/WaitForStylesheetsLoaded'
import createPath from '@/utils/RouteUtils'
import { getVersioned, getStatic } from '@/utils/AssetPath'
import config, { Property, Variable, Environment } from '@/config'
import $eventBus, { Events } from '@/events'
import { SET_LOCALE } from '@/store/modules/Application'
import directives from '@/directives'
import App from './app/App.vue'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

const store = getStore()
const app = createApp(App)

RegisterPlugin.registerDirectives(app, directives)

const startup = async () => {
  store.commit(SET_LOCALE, config.properties[Property.DEFAULT_LOCALE])
  app.use(InstallPlugin, {
    $http: axios,
    $vRoot: config.variables[Variable.VERSIONED_STATIC_ROOT],
    $sRoot: config.variables[Variable.STATIC_ROOT],
    $eventBus,
    Events,
    RouteNames,
    createPath,
    getVersioned,
    getStatic
  })

  if (process.env.NODE_ENV === Environment.DEVELOPMENT) await WaitForStylesheetsLoaded(document)
  app.use(store).use(router).mount('#app')
}

if (config.variables[Variable.LOCALE_ENABLED]) {
  const i18n = i18nSetup()
  app.use(i18n)
  loadLocale(config.properties[Property.DEFAULT_LOCALE]).then(startup)
} else {
  startup()
}
