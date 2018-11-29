import yml from 'js-yaml'
import { Context } from 'probot'
import getRepoName from './get-repo-branch-name'
import loadFile from './load-file'

// Loads and parses the bot configuration file with the given name from the repo on Github.
// The file is assumed to be in YML format.
export default async function(
  filename: string,
  context: Context
): Promise<any> {
  const repoName = getRepoName(context)
  let configText = ''
  try {
    // NOTE: Prettier and TSLint disagree on placing a semicolon on the next line
    // tslint:disable-next-line:whitespace semicolon
    ;[configText] = await loadFile(filename, context)
  } catch (e) {
    console.log(`${repoName}: NO ${filename} FOUND`)
    return {}
  }
  try {
    const result = yml.safeLoad(configText)
    console.log(`${repoName}: BOT CONFIG: ${JSON.stringify(result)}`)
    return result
  } catch (e) {
    console.log(`${repoName}: ERROR PARSING ${filename}:`, e.message)
  }
}
