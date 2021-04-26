export default {
  register(app, data, type) {
    Object.keys(data).forEach((key) => app[type](key, data[key]))
  },
  registerComponents(app, component) {
    this.register(app, component, 'component')
  },
  registerDirectives(app, directive) {
    this.register(app, directive, 'directive')
  }
}
