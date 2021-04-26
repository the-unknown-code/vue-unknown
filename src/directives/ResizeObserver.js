export default {
  name: 'ResizeObserver',
  // eslint-disable-next-line consistent-return
  beforeMount(el, binding) {
    if (!binding.value) {
      // eslint-disable-next-line no-console
      console.warn("Resize function haven't been set")
      return false
    }
    const callback = binding.value
    const { $eventBus, Events } = binding.instance
    $eventBus.$on(Events.RESIZE, callback)
  },
  beforeUnmount(el, binding) {
    const callback = binding.value
    const { $eventBus, Events } = binding.instance
    $eventBus.$off(Events.RESIZE, callback)
  }
}
