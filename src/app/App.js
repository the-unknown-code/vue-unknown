import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import { CHANGE_LOCALE } from '@/store/modules/Application'

export default defineComponent({
  name: 'App',
  computed: {
    version() {
      return `${process.env.PACKAGE_VERSION} - ${process.env.VERSION} - ${process.env.BRANCH}`
    }
  },
  watch: {
    // eslint-disable-next-line object-shorthand
    '$i18n.locale'() {
      this.$router.replace({ name: this.$route.name, params: { lang: this.$i18n.locale } })
    }
  },
  mounted() {
    // this.$router.replace({ name: this.RouteNames.HOMEPAGE, params: { lang: 'ja' } })
  },
  methods: {
    ...mapActions({
      changeLanguage: CHANGE_LOCALE
    })
  }
})
