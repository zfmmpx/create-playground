#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
execSync(`cd ${__dirname}; yarn`)
const chalk = require('chalk')

const calcPath = (path) => {
  let isExists = fs.existsSync(path)
  if (isExists) {
    const reg = /\d+$/
    const num = path.match(reg)
    if (num) return calcPath(`${path.substring(0, num.index)}${parseInt(num) + 1}`)

    return calcPath(`${path}1`)
  }

  return path
}

const createDir = (dirPath) => {
  fs.mkdirSync(dirPath)
}

const copyFolder = (fromPath, _toPath = 'playground', notFirstTime) => {
  const toPath = calcPath(_toPath)

  // 第一次执行copyFolder
  if (!notFirstTime) {
    fromPath = path.join(__dirname, fromPath)
    if (toPath !== _toPath) {
      console.log(
        chalk.yellow(
          `Dir ${chalk.bold.italic(_toPath)} exists. Creating dir ${chalk.bold.italic(toPath)}...`,
        ),
      )
    } else {
      console.log(chalk.green(`Creating dir ${chalk.bold.italic(toPath)}...`))
    }
  }

  createDir(toPath)

  const filesOrDirs = fs.readdirSync(fromPath, { withFileTypes: true })
  for (let i = 0; i < filesOrDirs.length; i++) {
    const targetFileOrDir = filesOrDirs[i]
    const source = path.join(fromPath, targetFileOrDir.name)
    const target = path.join(toPath, targetFileOrDir.name)
    if (targetFileOrDir.isFile()) {
      const buffer = fs.readFileSync(source)
      fs.writeFileSync(target, buffer)
    } else {
      copyFolder(source, target, true)
    }
  }
  if (!notFirstTime) {
    return toPath
  }
}

const toPath = copyFolder('./filesToCopy')
execSync(`cd ${toPath}; mv gitignore .gitignore`)

console.log(chalk.green(`Installing dir ${chalk.bold.italic(toPath)}'s dependencies...`))
execSync(`cd ${toPath}; yarn`)

// 已经安装好依赖了，清空无用的东西
const indexPath = path.join(__dirname, 'index.js')
const buffer = fs.readFileSync(indexPath)
const str = buffer.toString()
const reg = /execSync\(`cd \${__dirname}; yarn`\)\s*|(?<=execSync\(`cd \${toPath}; yarn`\))[\s\S]*/g
const finalStr = str.replace(reg, '')
fs.writeFileSync(indexPath, finalStr)
