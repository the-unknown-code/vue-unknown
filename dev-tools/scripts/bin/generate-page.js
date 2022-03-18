/* eslint-disable no-console */
const program = require('commander')
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const { sanitize, copyFolderRecursiveSync, renamePath, replaceInFile } = require('./utils')

let pageName = null
const source = path.join(__dirname, '../templates/page/{name_pc}')
const destination = path.join(__dirname, '../../../src/pages/')

program
  .option('-n, --name <name>', 'page name')
  .action(({ name }) => {
    pageName = sanitize(name)
  })
  .parse(process.argv)

if (!pageName) {
  console.error(chalk.red('Page name not set'))
  process.exit(1)
}

const targetFolder = path.join(destination, pageName)
if (fs.existsSync(targetFolder)) {
  console.error(chalk.red(`Destination path (${path.resolve(targetFolder)}) already exist.`))
  process.exit(1)
}

copyFolderRecursiveSync(source, destination)
renamePath(`${destination}{name_pc}`, `${destination}${pageName}`)
renamePath(`${destination}${pageName}/name_pc}.js`, `${destination}${pageName}/${pageName}.js`)
renamePath(`${destination}${pageName}/{name_pc}.vue`, `${destination}${pageName}/${pageName}.vue`)
replaceInFile(`${destination}${pageName}/index.js`, pageName)
replaceInFile(`${destination}${pageName}/${pageName}.js`, pageName)
replaceInFile(`${destination}${pageName}/${pageName}.vue`, pageName)
