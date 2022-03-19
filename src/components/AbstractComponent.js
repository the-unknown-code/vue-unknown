import { mapState } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AbstractComponent',
  computed: {
    ...mapState({
      stage: (state) => state.Application.stage
    })
  }
})
