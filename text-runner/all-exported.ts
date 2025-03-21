import * as assertNoDiff from "assert-no-diff"
import camelCase from "camelcase"
import * as fs from "fs"
import * as path from "path"
import * as tr from "text-runner"

export default function(action: tr.actions.Args) {
  const documented = documentedExports(action.region)
  const actual = actualExports()
  const signatures = actual.map(item => item.signature).join(", ")
  action.name(`verify exported functions: ${signatures}`)
  assertNoDiff.json(actual, documented)
}

interface ExportedItem {
  signature: string
  desc: string
}

function actualExports(): ExportedItem[] {
  const files = fs
    .readdirSync(path.join("..", "src"))
    .filter(file => file !== "index.ts")
    .filter(isFile)
    .sort()
  const actuals: ExportedItem[] = []
  for (const filename of files) {
    const filePath = path.join("..", "src", filename)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const lines = fileContent.split("\n")
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
        signature: camelCase(filename.replace(/\.ts$/, "")),
        desc: comments.join(" ").replace(/\.$/, "")
      })
      break
    }
  }
  return actuals
}

function isFile(filename: string): boolean {
  return fs.statSync(path.join("..", "src", filename)).isFile()
}

function documentedExports(nodes: tr.ast.NodeList): ExportedItem[] {
  let inLink = false
  let signature = ""
  let comments: string[] = []
  const result: ExportedItem[] = []
  for (const node of nodes) {
    if (node.type === "link_open") {
      inLink = true
      continue
    }
    if (node.type === "link_close") {
      inLink = false
      continue
    }
    if (node.type === "text" && inLink) {
      signature += node.content
      continue
    }
    if (node.type === "text" && !inLink) {
      comments.push(node.content)
      continue
    }
    if (node.type === "list_item_close") {
      result.push({
        signature,
        desc: comments.join(" ").replace(/\.$/, "").replace(/^\s*/, "").replace(/\s+/g, " ")
      })
      signature = ""
      comments = []
    }
  }
  return result
}
