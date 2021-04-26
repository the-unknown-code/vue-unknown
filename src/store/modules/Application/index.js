/* eslint-disable no-param-reassign */
import { loadLocale, setI18nLanguage } from '@/plugins/i18n'

const namespace = 'Application'
export const SET_LOCALE = `${namespace}/setLocale`
export const CHANGE_LOCALE = `${namespace}/changeLocale`

export default {
  state: {
    locale: null,
    sw: 0,
    sh: 0
  },
  getters: {},
  mutations: {
    [SET_LOCALE](state, locale) {
      state.locale = locale
    }
  },
  actions: {
    async [CHANGE_LOCALE]({ commit }, locale) {
      await loadLocale(locale)
      setI18nLanguage(locale)
      commit(SET_LOCALE, locale)
    }
  }
}
