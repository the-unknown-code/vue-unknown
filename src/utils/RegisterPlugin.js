export default {
  register(app, data, type) {
    Object.keys(data).forEach((key) => app[type](key, data[key]))
  },
  registerComponents(app, components) {
    this.register(app, components, 'component')
  },
  registerDirectives(app, directives) {
    this.register(app, directives, 'directive')
  }
}
