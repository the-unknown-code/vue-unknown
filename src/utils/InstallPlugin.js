export default {
  install(app, options) {
    Object.keys(options).forEach((key) => {
      if (app.config.globalProperties[key]) {
        // eslint-disable-next-line no-console
        console.error(`Key ${key} already exists`)
      } else {
        Object.defineProperty(app.config.globalProperties, key, {
          get() {
            return options[key]
          }
        })
      }
    })
  }
}
