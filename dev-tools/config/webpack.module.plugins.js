const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports =
  ({ config, buildType, isDevelopment }) =>
  (webpackConfig) => {
    const plugins = [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'static',
            to: isDevelopment ? 'static' : `${config.dist.versionPath}static`
          },
          {
            from: 'static-root',
            to: ''
          }
        ]
      }),
      new HtmlWebpackPlugin(
        isDevelopment
          ? {
              filename: config.devServer.indexHtml,
              template: 'index.html',
              inject: true,
              version: config.dist.versionPath,
              publicPath: config.dist.publicPath,
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false
              },
              chunksSortMode: 'none'
            }
          : {
              publicPath: config.dist.publicPath,
              filename: 'index.html',
              template: 'index.html',
              version: '/',
              inject: 'body',
              cache: true,
              clean: true
            }
      ),
      new webpack.DefinePlugin({
        'process.env': config.env[buildType],
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
      }),

      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: path.posix.join(config.dist.versionPath, 'css/[name].css')
      }),
      new WebpackBar(),
      new VueLoaderPlugin()
    ]

    /*
     * Hot Module Replacement (or HMR) is one of the most useful features offered by webpack.
     * It allows all kinds of modules to be updated at runtime without the need for a full refresh.
     */
    if (isDevelopment) {
      plugins.push(new webpack.HotModuleReplacementPlugin())
    } else {
      plugins.push(
        new WorkboxPlugin.GenerateSW({
          // these options encourage the ServiceWorkers to get in there fast
          // and not allow any straggling "old" SWs to hang around
          clientsClaim: true,
          skipWaiting: true
        }),
        new BeautifyHtmlWebpackPlugin()
      )

      if (config.generateFavIcon) {
        plugins.push(
          new FaviconsWebpackPlugin({
            logo: path.join(config.projectRoot, 'static/favicon.png'),
            prefix: `${config.dist.versionPath}static/favicon/`,
            cache: true,
            inject: true,
            favicons: {
              icons: {
                android: true,
                appleIcon: true,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: false,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
              }
            }
          })
        )
      }
    }

    // Visualize size of webpack output files with an interactive zoomable treemap.
    if (config.enableBundleAnalyzer) {
      plugins.push(
        new BundleAnalyzerPlugin({
          defaultSizes: 'gzip'
        })
      )
    }

    return {
      ...webpackConfig,
      plugins
    }
  }
