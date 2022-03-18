import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useResizeObserver, useDebounceFn } from '@vueuse/core'
import { SET_STAGE } from '@/store/modules/Application'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const app = ref(null)

    // Resize Handler
    const onResizeHandler = useDebounceFn((entries) => {
      const entry = entries[0]
      const { width, height } = entry.contentRect
      store.commit(SET_STAGE, { width, height })
    }, 40)

    useResizeObserver(app, onResizeHandler)

    return {
      app
    }
  }
})
