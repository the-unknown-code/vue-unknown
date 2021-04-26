import { createStore } from 'vuex'
import { Environment } from '@/config'
import modules from '@/store/modules'

// eslint-disable-next-line import/no-mutable-exports
let store = null
const initStore = () => {
  store = createStore({
    modules,
    strict: process.env.NODE_ENV !== Environment.PRODUCTION
  })
}

const getStore = () => {
  if (!store) initStore()
  return store
}

export default getStore
