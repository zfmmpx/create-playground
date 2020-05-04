#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const copyFolder = (fromPath, toPath = 'playground', direct) => {
  if (!direct) {
    fromPath = path.join(__dirname, fromPath)
    // toPath = path.join(__dirname, toPath)
  }
  const createDir = (dirPath) => {
    fs.mkdirSync(dirPath)
  }
  if (fs.existsSync(fromPath)) {
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
  }
}

copyFolder('./filesToCopy')

execSync('cd playground; yarn')
