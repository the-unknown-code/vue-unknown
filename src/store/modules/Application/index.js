/* eslint-disable no-param-reassign */
import { loadLocale, setI18nLanguage } from '@/plugins/i18n'

const namespace = 'Application'

// Mutations
export const SET_LOCALE = `${namespace}/setLocale`
export const SET_STAGE = `${namespace}/setStage`
export const SET_MEDIA_STATE = `${namespace}/setMediaState`

// Actions
export const CHANGE_LOCALE = `${namespace}/changeLocale`

export default {
  state: {
    locale: null,
    mediaState: null,
    sw: 0,
    sh: 0
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
