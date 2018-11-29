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
    let signatureParts = []
    for (const line of lines) {
      if (line.startsWith('import')) continue
      if (line === '') continue
      if (line.startsWith('//')) {
        comments.push(line.replace('// ', ''))
        continue
      }
      signatureParts.push(
        line
          .replace(/\s*/, '')
          .replace(' {', '')
          .replace('export default ', '')
          .replace('function(', `function ${functionName(filename)}(`)
      )
      if (line.includes('{')) {
        actuals.push({
          desc: comments
            .join(' ')
            .toLowerCase()
            .replace(/\.$/, ''),
          signature: signatureParts
            .join(' ')
            .replace('( ', '(')
            .replace(' )', ')')
        })
        break
      }
    }
  }
  return actuals
}

function isFile(filename) {
  return fs.statSync(path.join('..', 'src', filename)).isFile()
}

function functionName(filename) {
  return camelCase(filename.replace('.ts', ''))
}

function documentedExports(nodes) {
  let inStrong = false
  let signature = ''
  let comments = []
  result = []
  for (const node of nodes) {
    if (node.type === 'strong_open') {
      inStrong = true
    }
    if (node.type === 'strong_close') {
      inStrong = false
    }
    if (node.type === 'text' && inStrong) {
      signature += node.content.replace(/:$/, '')
    }
    if (node.type === 'text' && !inStrong) {
      comments.push(node.content)
    }
    if (node.type === 'list_item_close') {
      result.push({
        signature,
        desc: comments
          .join(' ')
          .replace(/\.$/, '')
          .replace(/^\s*/, '')
          .toLocaleLowerCase()
      })
      signature = ''
      comments = []
    }
  }
  return result
}
