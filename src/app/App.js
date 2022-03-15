import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useResizeObserver, useDebounceFn } from '@vueuse/core'
import useGlobals from '@/config/useGlobals'
import { SET_STAGE, CHANGE_LOCALE } from '@/store/modules/Application'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const { $eventBus, Events } = useGlobals()
    const app = ref(null)

    // Resize Handler
    const onResizeHandler = useDebounceFn((entries) => {
      const entry = entries[0]
      const { width, height } = entry.contentRect
      store.commit(SET_STAGE, { sw: width, sh: height })
    }, 40)

    useResizeObserver(app, onResizeHandler)

    return {
      app
    }
  }
})
