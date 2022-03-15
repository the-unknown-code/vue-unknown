/* eslint-disable no-console */
const program = require('commander')
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const { sanitize, copyFolderRecursiveSync, renamePath, replaceInFile } = require('./utils')

let componentName = null
const source = path.join(__dirname, '../templates/component/{name_pc}')
const destination = path.join(__dirname, '../../../src/components/')

program
  .option('-n, --name <name>', 'component name')
  .action(({ name }) => {
    componentName = sanitize(name)
  })
  .parse(process.argv)

if (!componentName) {
  console.error(chalk.red('Component name not set'))
  process.exit(1)
}

const targetFolder = path.join(destination, componentName)
if (fs.existsSync(targetFolder)) {
  console.error(chalk.red(`Destination path (${path.resolve(targetFolder)}) already exist.`))
  process.exit(1)
}

copyFolderRecursiveSync(source, destination)
renamePath(`${destination}{name_pc}`, `${destination}${componentName}`)
renamePath(`${destination}${componentName}/{name_pc}.js`, `${destination}${componentName}/${componentName}.js`)
renamePath(`${destination}${componentName}/{name_pc}.vue`, `${destination}${componentName}/${componentName}.vue`)
replaceInFile(`${destination}${componentName}/index.js`, componentName)
replaceInFile(`${destination}${componentName}/${componentName}.js`, componentName)
replaceInFile(`${destination}${componentName}/${componentName}.vue`, componentName)
