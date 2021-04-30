/* eslint-disable no-console */
const program = require('commander')
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const { sanitize, copyFolderRecursiveSync, renamePath, replaceInFile } = require('./utils')

let storeName = null
const source = path.join(__dirname, '../templates/store/{name_pc}')
const destination = path.join(__dirname, '../../../src/store/modules/')

program
  .option('-n, --name <name>', 'store name')
  .action(({ name }) => {
    storeName = sanitize(name)
  })
  .parse(process.argv)

if (!storeName) {
  console.error(chalk.red('Store name not set'))
  process.exit(1)
}

const targetFolder = path.join(destination, storeName)
if (fs.existsSync(targetFolder)) {
  console.error(chalk.red(`Destination path (${path.resolve(targetFolder)}) already exist.`))
  process.exit(1)
}

copyFolderRecursiveSync(source, destination)
renamePath(`${destination}{name_pc}`, `${destination}${storeName}`)
renamePath(`${destination}${storeName}\\{name_pc}.js`, `${destination}${storeName}\\${storeName}.js`)
replaceInFile(`${destination}${storeName}\\${storeName}.js`, storeName)
