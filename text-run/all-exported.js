const camelCase = require("camelcase")
const fs = require("fs")
const path = require("path")
const assertNoDiff = require("assert-no-diff")

module.exports = function({ nodes }) {
  const documented = documentedExports(nodes)
  const actual = actualExports()
  assertNoDiff.trimmedLines(actual, documented)
}

function actualExports() {
  const files = fs
    .readdirSync(path.join("..", "src"))
    .filter(file => file !== "index.ts")
    .filter(isFile)
    .sort()
  const actuals = []
  for (const filename of files) {
    const filePath = path.join("..", "src", filename)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const lines = fileContent.split("\r\n")
    let comments = []
    for (const line of lines) {
      if (line.startsWith("import")) continue
      if (line === "") continue
      if (line.startsWith("/** ")) {
        comments.push(line.replace("/** ", "").replace(" */", ""))
        continue
      }
      if (line.startsWith("/**")) continue
      if (line.startsWith(" */")) continue
      if (line.startsWith(" * ")) {
        comments.push(line.replace(" * ", ""))
        continue
      }
      actuals.push({
        desc: comments
          .join(" ")
          .toLowerCase()
          .replace(/\.$/, ""),
        signature: camelCase(filename.replace(/\.ts$/, ""))
      })
      break
    }
  }
  return actuals.join("")
}

function isFile(filename) {
  return fs.statSync(path.join("..", "src", filename)).isFile()
}

function documentedExports(nodes) {
  let inLink = false
  let signature = ""
  let comments = []
  result = []
  for (const node of nodes) {
    if (node.type === "link_open") {
      inLink = true
    }
    if (node.type === "link_close") {
      inLink = false
    }
    if (node.type === "text" && inLink) {
      signature += node.content
    }
    if (node.type === "text" && !inLink) {
      comments.push(node.content)
    }
    if (node.type === "list_item_close") {
      result.push({
        signature,
        desc: comments
          .join(" ")
          .replace(/\.$/, "")
          .replace(/^\s*/, "")
          .replace(/\s+/g, " ")
          .toLocaleLowerCase()
      })
      signature = ""
      comments = []
    }
  }
  return result.join("")
}
