import { defineComponent } from 'vue'
import { mapActions, mapMutations } from 'vuex'
import { SET_STAGE, CHANGE_LOCALE } from '@/store/modules/Application'

export default defineComponent({
  name: 'App',
  computed: {
    version() {
      return `${process.env.PACKAGE_VERSION} - ${process.env.VERSION} - ${process.env.BRANCH}`
    }
  },
  created() {
    window.addEventListener(this.Events.RESIZE, this.onResizeHandler)
    this.onResizeHandler()
  },
  methods: {
    ...mapActions({
      changeLanguage: CHANGE_LOCALE
    }),
    ...mapMutations({
      setStage: SET_STAGE
    }),
    onResizeHandler() {
      const { innerWidth, innerHeight } = window
      this.setStage({ sw: innerWidth, sh: innerHeight })
      this.$eventBus.$emit(this.Events.RESIZE)
    }
  }
})
