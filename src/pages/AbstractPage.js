import { mapState } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AbstractPage',
  computed: {
    ...mapState({
      stage: (state) => state.Application.stage
    })
  },
  mounted() {
    document.dispatchEvent(new Event(this.Events.PAGE_CREATED))
  }
})
