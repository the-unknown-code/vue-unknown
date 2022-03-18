const path = require('path')

module.exports =
  ({ config, isDevelopment = true }) =>
  (webpackConfig) => ({
    ...webpackConfig,
    output: {
      path: path.join(config.projectRoot, 'dist', config.dist.publicPath !== '/' ? config.dist.publicPath : ''),
      publicPath: isDevelopment ? '/' : config.dist.publicPath,
      filename: isDevelopment ? '[name].js' : path.posix.join('', `${config.dist.versionPath}js/[name].js`),
      chunkFilename: isDevelopment ? '[id].js' : path.posix.join('', `${config.dist.versionPath}js/[id].js`)
    }
  })
