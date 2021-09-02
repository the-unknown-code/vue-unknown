/* eslint-disable no-console */
const program = require('commander')
const chalk = require('chalk')

console.log(chalk.blue('Vue Unknown Generator'))
console.log()

program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('component', 'Generate a component module')
  .command('page', 'Generate a page module')
  .command('store', 'Generate a store module')
  .parse(process.argv)
