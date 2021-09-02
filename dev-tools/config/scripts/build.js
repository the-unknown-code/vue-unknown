/* eslint-disable no-console */
/* eslint-disable no-throw-literal */
require('shelljs/global')

const ora = require('ora')
const fs = require('fs-extra')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.prod')

const spinner = ora('Vue Unknown: Building for production')
spinner.start()

fs.emptyDirSync(webpackConfig.output.path)
webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err

  if (stats.hasErrors()) {
    throw `${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      reasons: false
    })}\n`
  }

  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      reasons: false
    })
  )

  console.log()
  console.log(chalk.blue('Vue Unknown: You can preview your build by running:'), chalk.blue.bold('yarn preview'))
  console.log(chalk.blue('Vue Unknown: You can analyze your build by running:'), chalk.blue.bold('yarn analyze'))
  console.log()
})
