import { mapState } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AbstractPage',
  head: {
    title: null,
    meta: []
  },
  computed: {
    ...mapState({
      sw: (state) => state.Application.sw,
      sh: (state) => state.Application.sh,
      mediaState: (state) => state.Application.mediaState
    })
  }
})
