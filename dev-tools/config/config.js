const path = require('path')
const { argv } = require('yargs')

const BuildType = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production'
}

/*
 *
 * Change the publicPath if site is running in a subfolder on the server.
 * It's also possible to override this publicPath by using: yarn build -- --publicPath=/v/sub-vue/
 *
 * When you don't know the publicPath at build time
 * you can set `window['webpackPublicPath']` beforeloading any script in your HTML.
 *
 */

const publicPath = (argv && argv.path) || '/'

/*
 *
 * It's also possible to override the version number during a build.
 * yarn build -- --v=v1
 *
 */
const version = (argv && argv.v) || `${new Date().getTime()}`
const versionPath = `version/${version}/`
const packageVersion = JSON.stringify(require('../../package.json').version).replace(/^"(.*)"$/, '$1')

module.exports = {
  BuildType,
  projectRoot: path.resolve(__dirname, '../../'),

  // Server Configuration
  devServer: {
    indexHtml: path.resolve(__dirname, '../../dist/index.html'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    useHttps: false
  },

  // Non development builds
  dist: {
    versionPath,
    publicPath
  },

  // Set to true to enabled prerendering of all routes
  prerender: false,

  // Generates icons for all platforms with favicon.png from static/favicon.(png|svg) as the source image
  generateFavIcon: true,

  // Tools
  enableBundleAnalyzer: !!argv.analyze,
  lintStaged: {
    eslintEnabled: true,
    tslintEnabled: false,
    stylelintEnabled: true
  },

  // Environment Variables (set using DefinePlugin)
  env: {
    [BuildType.DEVELOPMENT]: {
      NODE_ENV: JSON.stringify(BuildType.DEVELOPMENT),
      VERSIONED_STATIC_ROOT: JSON.stringify('static/'),
      STATIC_ROOT: JSON.stringify(''),
      PUBLIC_ROOT: JSON.stringify(''),
      PUBLIC_PATH: JSON.stringify('/'),
      PACKAGE_VERSION: JSON.stringify(packageVersion)
    },
    [BuildType.PRODUCTION]: {
      NODE_ENV: JSON.stringify(BuildType.PRODUCTION),
      VERSIONED_STATIC_ROOT: JSON.stringify(`${versionPath}static/`),
      STATIC_ROOT: JSON.stringify(''),
      PUBLIC_ROOT: JSON.stringify(publicPath),
      PUBLIC_PATH: JSON.stringify(publicPath),
      PACKAGE_VERSION: JSON.stringify(packageVersion)
    }
  }
}
