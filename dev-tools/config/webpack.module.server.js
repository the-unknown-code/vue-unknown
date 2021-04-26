const fs = require('fs')

module.exports = ({ config }) => (webpackConfig) => ({
  ...webpackConfig,
  devServer: {
    https: config.devServer.useHttps,
    clientLogLevel: 'info',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: 'localhost',
    port: config.devServer.port,
    disableHostCheck: true,
    open: false,
    overlay: {
      warning: false,
      errors: true
    }
  }
})
