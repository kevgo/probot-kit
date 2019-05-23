import Webhooks from '@octokit/webhooks'
import yml from 'js-yaml'
import probot from 'probot'
import { getRepoBranchSha } from './get-repo-branch-sha'
import { loadFile } from './load-file'

// Loads and parses the bot configuration file with the given name from the repo on Github.
// The file is assumed to be in YML format.
export async function loadBotConfig(
  filename: string,
  context: probot.Context<Webhooks.WebhookPayloadPush>
): Promise<any> {
  const repoName = getRepoBranchSha(context)
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
