/* eslint-disable global-require */
const config = require('./config')
const helpers = require('./webpack.helpers')

module.exports = (buildType = config.BuildType.DEVELOPMENT) => {
  const generator = helpers.compose(
    [
      require('./webpack.module.entry'),
      require('./webpack.module.output'),
      require('./webpack.module.server'),
      require('./webpack.module.rules'),
      require('./webpack.module.plugins'),
      require('./webpack.module.resolve'),
      require('./webpack.module.optimize')
    ].map((module) =>
      module({
        isDevelopment: buildType === config.BuildType.DEVELOPMENT,
        buildType,
        config
      })
    )
  )

  return generator({
    mode: buildType,
    devtool: buildType === config.BuildType.DEVELOPMENT ? 'cheap-module-eval-source-map' : false
  })
}
