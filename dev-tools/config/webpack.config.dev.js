const detectPort = require('detect-port')
const opn = require('opn')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const config = require('./config')

module.exports = detectPort(config.devServer.port).then((port) => {
  // eslint-disable-next-line global-require
  const devWebpackConfig = require('./webpack.config.base')(config.BuildType.DEVELOPMENT)
  process.env.PORT = port
  devWebpackConfig.devServer.port = port

  if (config.devServer.autoOpenBrowser) {
    opn(`${config.devServer.useHttps ? 'https' : 'http'}://localhost:${port}`).catch(() => {})
  }

  if (devWebpackConfig.plugins) {
    devWebpackConfig.plugins.push(
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Vue Unknown - Your application is running here: ${config.devServer.useHttps ? 'https' : 'http'}://localhost:${port}`]
        }
      })
    )
  } else {
    // eslint-disable-next-line no-throw-literal
    throw 'Vue Unknown: Plugins not declared'
  }

  return devWebpackConfig
})
