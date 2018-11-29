const camelCase = require('camelcase')
const fs = require('fs')
const path = require('path')
const jsdiff = require('jsdiff-console')

module.exports = function({ nodes }) {
  const documented = documentedExports(nodes)
  const actual = actualExports()
  jsdiff(actual, documented)
}

function actualExports() {
  const files = fs
    .readdirSync(path.join('..', 'src'))
    .filter(file => file !== 'index.ts')
    .filter(isFile)
  const actuals = []
  for (const filename of files) {
    const filePath = path.join('..', 'src', filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const lines = fileContent.split('\r\n')
    let comments = []
    for (const line of lines) {
      if (line.startsWith('import')) continue
      if (line === '') continue
      if (line.startsWith('//')) {
        comments.push(line.replace('// ', ''))
        continue
      }
      actuals.push({
        desc: comments
          .join(' ')
          .toLowerCase()
          .replace(/\.$/, ''),
        signature: camelCase(filename.replace(/\.ts$/, ''))
      })
      break
    }
  }
  return actuals
}

function isFile(filename) {
  return fs.statSync(path.join('..', 'src', filename)).isFile()
}

function documentedExports(nodes) {
  let inLink = false
  let signature = ''
  let comments = []
  result = []
  for (const node of nodes) {
    if (node.type === 'link_open') {
      inLink = true
    }
    if (node.type === 'link_close') {
      inLink = false
    }
    if (node.type === 'text' && inLink) {
      signature += node.content
    }
    if (node.type === 'text' && !inLink) {
      comments.push(node.content)
    }
    if (node.type === 'list_item_close') {
      result.push({
        signature,
        desc: comments
          .join(' ')
          .replace(/\.$/, '')
          .replace(/^\s*/, '')
          .replace(/\s+/g, ' ')
          .toLocaleLowerCase()
      })
      signature = ''
      comments = []
    }
  }
  return result
}
