import DebugInfo from './DebugInfo.vue'

export default {
  title: 'Utils/DebugInfo',
  component: DebugInfo
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { DebugInfo },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { ...args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<debug-info />'
})

export const Default = Template.bind({})
