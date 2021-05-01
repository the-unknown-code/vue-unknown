/* eslint-disable no-param-reassign */
import { loadLocale, setI18nLanguage } from '@/plugins/i18n'
import config, { Variable, Theme } from '@/config'

const namespace = 'Application'

// Mutations
export const SET_LOCALE = `${namespace}/setLocale`
export const SET_STAGE = `${namespace}/setStage`
export const SET_MEDIA_STATE = `${namespace}/setMediaState`
export const SET_THEME_MODE = `${namespace}/setThemeMode`

// Actions
export const CHANGE_LOCALE = `${namespace}/changeLocale`

export default {
  state: {
    themeMode: null,
    locale: null,
    mediaState: null,
    sw: window.innerWidth,
    sh: window.innerHeight
  },
  getters: {},
  mutations: {
    [SET_STAGE](state, { sw, sh }) {
      state.sw = sw
      state.sh = sh
    },
    [SET_LOCALE](state, locale) {
      state.locale = locale
    },
    [SET_MEDIA_STATE](state, mediaState) {
      state.mediaState = mediaState
    },
    [SET_THEME_MODE](state, themeMode) {
      state.themeMode = themeMode
      if (config.variables[Variable.THEME_MODE_ENABLED]) {
        document.documentElement.classList.remove(Theme.LIGHT)
        document.documentElement.classList.remove(Theme.DARK)
        document.documentElement.classList.add(themeMode)
      }
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
