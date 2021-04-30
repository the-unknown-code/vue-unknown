const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = ({ config, isDevelopment }) => (webpackConfig) => ({
  ...webpackConfig,
  optimization: isDevelopment
    ? {
        noEmitOnErrors: true
      }
    : {
        minimize: true,
        minimizer: [
          (compiler) => {
            new TerserPlugin({
              parallel: true,
              terserOptions: {
                compress: {
                  drop_console: true
                }
              }
            }).apply(compiler)
          },
          new CssMinimizerPlugin()
        ],
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        }
      }
})
