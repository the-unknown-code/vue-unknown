const path = require('path')

module.exports =
  ({ config }) =>
  (webpackConfig) => ({
    ...webpackConfig,
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
        '@': path.resolve(config.projectRoot, 'src')
        /*
         * You are running the esm-bundler build of vue-i18n.
         * It is recommended to configure your bundler to explicitly replace feature flag globals
         * with boolean literals to get proper tree-shaking in the final bundle.
         */
      }
    }
  })
