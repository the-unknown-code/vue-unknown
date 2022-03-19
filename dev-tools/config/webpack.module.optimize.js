const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports =
  ({ config, isDevelopment }) =>
  (webpackConfig) => ({
    ...webpackConfig,
    optimization: isDevelopment
      ? {
          emitOnErrors: false
        }
      : {
          minimize: true,
          minimizer: [
            (compiler) => {
              new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                  compress: {
                    drop_console: true
                  }
                }
              }).apply(compiler)
            },
            new CssMinimizerPlugin()
          ],
          removeAvailableModules: false,
          removeEmptyChunks: false,
          splitChunks: false

          /*
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  // get the name. E.g. node_modules/packageName/not/this/part.js
                  // or node_modules/packageName
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

                  // npm package names are URL-safe, but some servers don't like @ symbols
                  return `npm.${packageName.replace('@', '')}`
                }
              }
            }
          }

          */
        }
  })
