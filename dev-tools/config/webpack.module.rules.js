const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const path = require('path')

module.exports =
  ({ config, isDevelopment }) =>
  (webpackConfig) => ({
    ...webpackConfig,
    module: {
      rules: [
        isDevelopment
          ? {
              test: /\.(s[ac]ss|css)$/,
              use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    sassOptions: {
                      indentWidth: 4,
                      includePaths: []
                    }
                  }
                }
              ]
            }
          : {
              test: /\.(s[ac]ss|css)$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    sassOptions: {
                      indentWidth: 4,
                      includePaths: []
                    }
                  }
                }
              ]
            },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          // use: ['babel-loader', 'eslint-loader']

          use: [
            {
              loader: 'babel-loader?cacheDirectory',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          ]
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader?cacheDirectory',
              options: { babelrc: true }
            },
            {
              loader: 'ts-loader',
              options: { appendTsSuffixTo: [/\.vue$/] }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: path.posix.join(isDevelopment ? '' : config.dist.versionPath, 'fonts/[name].[ext]')
            }
          }
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.(ico|gif|png|jpg|jpeg|svg)$/i,
          use: [
            {
              loader: ImageMinimizerPlugin.loader,
              options: {
                severityError: 'warning', // Ignore errors on corrupted images
                minimizerOptions: {
                  plugins: ['gifsicle']
                }
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'file-loader'
            },
            {
              loader: 'svgo-loader',
              options: {
                multipass: true,
                js2svg: {
                  indent: 2,
                  pretty: true
                }
              }
            }
          ]
        }
      ]
    }
  })
