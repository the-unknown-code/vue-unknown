const path = require('path')

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-docs',
      options: {
        vueDocgenOptions: {
          alias: {
            '@': path.resolve(__dirname, '../')
          }
        }
      }
    },
    {
      name: '@storybook/addon-postcss',
      options: {
        cssLoaderOptions: {
          // When you have splitted your css over multiple files
          // and use @import('./other-styles.css')
          importLoaders: 1
        },
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src')
    config.module.rules.push({
      test: /\.(s[ac]ss|css)$/,
      use: [
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
    })
    return config
  }
}
