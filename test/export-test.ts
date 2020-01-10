import camelCase from "camelcase"
import * as fs from "fs"
import * as path from "path"
import * as kit from "../src/index"

describe("exported functions", function() {
  const exported = Object.keys(kit)
  for (const actualFunction of actualFunctions()) {
    it(`exports ${actualFunction}`, function() {
      if (!exported.includes(actualFunction)) {
        throw new Error(`expected [${exported}] to include ${actualFunction}`)
      }
    })
  }
})

// Returns the names of the actually exported functions
function actualFunctions() {
  return fs
    .readdirSync(path.join("src"))
    .filter(file => file !== "index.ts")
    .filter(file => file.endsWith(".ts"))
    .map(file => file.replace(".ts", ""))
    .map(file => camelCase(file))
}
