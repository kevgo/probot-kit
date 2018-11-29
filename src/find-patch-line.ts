import parseDiff, { AddChange, NormalChange } from 'parse-diff'

// Takes a line number in a file
// and returns the corresponding line number in the patch file
// according to https://developer.github.com/v3/pulls/comments/#create-a-comment
// or falsy if the patch doesn't contain the given line number.
// The patch must be downloaded by the downloadPatch function.
export default function(
  patchText: string,
  filename: string,
  lineNumber: number
): number | undefined {
  // find the text of the line in question
  let lineText = ''
  for (const file of parseDiff(patchText)) {
    if (file.to !== filename) {
      continue
    }
    for (const hunk of file.chunks) {
      for (const change of hunk.changes) {
        console.log('CHANGE', change)
        // if (change.del) { continue }
        let line = 0
        if (change.type === 'normal') {
          const normalChange = change as NormalChange
          line = normalChange.ln2
        } else if (change.type === 'add') {
          const addChange = change as AddChange
          line = addChange.ln
        }
        if (line === lineNumber) {
          lineText = change.content
        }
      }
    }
  }
  console.log('TEXT OF LINE WITH ERROR:', lineText)

  if (lineText === '') {
    return undefined
  }

  const patchLines = patchText.split('\n')
  const lineIndex = patchLines.findIndex(line => line === lineText)
  console.log('INDEX OF ERROR LINE IN PATCHFILE:', lineIndex)
  const firstHunkLine = patchLines.findIndex(line => line.startsWith('@@'))
  return lineIndex - firstHunkLine
}