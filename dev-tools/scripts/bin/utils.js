/* eslint-disable no-console */
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const toPascalCase = (label) =>
  label
    .match(/[a-z]+/gi)
    .map((word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join('')

const sanitize = (name) => toPascalCase(name.match(/[a-zA-Z]+/g).join(' '))

const copyFileSync = (source, target) => {
  let targetFile = target

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source))
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source))
}

const copyFolderRecursiveSync = (source, target) => {
  let files = []

  // Check if folder needs to be created or integrated
  const targetFolder = path.join(target, path.basename(source))
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  } else {
    console.error(chalk.red('Folder already exists!'))
    process.exit(1)
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach((file) => {
      const curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        copyFileSync(curSource, targetFolder)
      }
    })
  }
}

const renamePath = (source, target) => {
  fs.renameSync(source, target, (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
}

const replaceInFile = (filename, replacer, type = 'utf8') => {
  fs.readFile(filename, type, (err, data) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    const result = data.replace(/{{name_pc}}/g, replacer)

    fs.writeFile(filename, result, type, (error) => {
      if (error) {
        console.error(err)
        process.exit(1)
      }
    })
  })
}

module.exports = {
  toPascalCase,
  sanitize,
  copyFolderRecursiveSync,
  copyFileSync,
  renamePath,
  replaceInFile
}
