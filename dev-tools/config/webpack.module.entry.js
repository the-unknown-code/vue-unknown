const path = require('path')

module.exports = () => (webpackConfig) => ({
  ...webpackConfig,
  entry: {
    polyfill: path.resolve(__dirname, '../../src', 'polyfill/index.js'),
    app: path.resolve(__dirname, '../../src', 'bootstrap.js')
  }
})
