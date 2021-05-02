import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import config, { Property } from '@/config'

let i18n
let currentLocale

export const getLocale = () => currentLocale

export const setI18nLanguage = (locale) => {
  // eslint-disable-next-line no-param-reassign
  if (i18n.mode === 'legacy') i18n.global.locale = locale
  // eslint-disable-next-line no-param-reassign
  else i18n.global.locale.value = locale

  currentLocale = locale
  document.querySelector('html').setAttribute('lang', locale)
}

export async function loadLocale(locale) {
  const messages = await import(`@/locale/${locale}.json`)
  i18n.global.setLocaleMessage(locale, messages.default)
  return nextTick()
}

export default function setupI18n(options = { locale: config.properties[Property.DEFAULT_LOCALE] }) {
  return new Promise((resolve) => {
    i18n = createI18n({ ...options, fallbackLocale: config.properties[Property.FALLBACK_LOCALE] })
    setI18nLanguage(options.locale)
    resolve(i18n)
  })
}
