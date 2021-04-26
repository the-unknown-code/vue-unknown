/* eslint-disable no-console */
const program = require('commander')
const chalk = require('chalk')

console.log(chalk.blue('Vue Skeleton Generator'))
console.log()

program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('component', 'Generate a component module')
  .command('store', 'Generate a store module')
  .parse(process.argv)
