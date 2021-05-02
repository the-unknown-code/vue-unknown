export const RouterMode = {
  HISTORY: 'history',
  HASH: 'hash',
  ABSTRACT: 'abstract'
}

export const Theme = {
  LIGHT: 'light',
  DARK: 'dark'
}

export const Environment = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development'
}

export const Variable = {
  LOCALE_ENABLED: 'locale-enabled',
  LOCALE_ROUTING_ENABLED: 'locale-routing-enabled',
  STATIC_ROOT: 'static-root',
  PUBLIC_PATH: 'public-path',
  VERSIONED_STATIC_ROOT: 'versioned-static-root',
  SERVICE_WORKER_ENABLED: 'service-worker',
  THEME_MODE_ENABLED: 'theme-mode-enabled',
  THEME_MODE: 'theme-mode'
}

export const Property = {
  ROUTER_MODE: 'router-mode',
  FALLBACK_LOCALE: 'fallback-locale',
  DEFAULT_LOCALE: 'default-locale',
  AVAILABLE_LOCALES: 'available-locales'
}

export const URL = {
  DEVELOPMENT_API_URL: 'development-api-url',
  PRODUCTION_API_URL: 'production-api-url'
}

const { pathname } = window.location
const language = pathname.split('/')[1]
const defaultLanguage = language.length ? language.toLowerCase() : 'en'
const availableLanguages = ['en']

export default {
  environment: process.env.NODE_ENV,
  variables: {
    [Variable.THEME_MODE_ENABLED]: true,
    [Variable.THEME_MODE]: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT,
    [Variable.SERVICE_WORKER_ENABLED]: true,
    [Variable.LOCALE_ENABLED]: false,
    [Variable.LOCALE_ROUTING_ENABLED]: true,
    [Variable.VERSIONED_STATIC_ROOT]: `${window.webpackPublicPath || process.env.PUBLIC_PATH}${process.env.VERSIONED_STATIC_ROOT}`,
    [Variable.STATIC_ROOT]: `${window.webpackPublicPath || process.env.PUBLIC_PATH}${process.env.STATIC_ROOT}`,
    [Variable.PUBLIC_PATH]: `${window.webpackPublicPath || process.env.PUBLIC_PATH}`
  },
  urls: {
    [URL.DEVELOPMENT_API_URL]: '::prod',
    [URL.PRODUCTION_API_URL]: '::dev'
  },
  properties: {
    [Property.ROUTER_MODE]: RouterMode.HISTORY,
    [Property.FALLBACK_LOCALE]: availableLanguages[0],
    [Property.DEFAULT_LOCALE]: availableLanguages.includes(defaultLanguage) ? defaultLanguage : availableLanguages[0],
    [Property.AVAILABLE_LOCALES]: availableLanguages
  }
}
