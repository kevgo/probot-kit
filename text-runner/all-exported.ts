import * as assertNoDiff from "assert-no-diff"
import * as camelCase from "camelcase"
import * as fs from "fs"
import * as path from "path"
import * as tr from "text-runner"

export default function(action: tr.actions.Args) {
  const documented = documentedExports(action.region)
  const actual = actualExports()
  assertNoDiff.trimmedLines(actual, documented)
}

function actualExports() {
  const files = fs
    .readdirSync(path.join("..", "src"))
    .filter(file => file !== "index.ts")
    .filter(isFile)
    .sort()
  const actuals: any[] = []
  for (const filename of files) {
    const filePath = path.join("..", "src", filename)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const lines = fileContent.split("\r\n")
    const comments: string[] = []
    for (const line of lines) {
      if (!line || line.startsWith("import")) continue
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

function isFile(filename: string): boolean {
  return fs.statSync(path.join("..", "src", filename)).isFile()
}

function documentedExports(nodes: tr.ast.NodeList): string {
  let inLink = false
  let signature = ""
  let comments: string[] = []
  const result: any[] = []
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
