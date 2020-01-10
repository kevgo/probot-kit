import webhooks from "@octokit/webhooks"
import yml from "js-yaml"
import * as probot from "probot"
import { getRepoBranchSha } from "./get-repo-branch-sha"
import { loadFile, LoadFileResult } from "./load-file"

/**
 * Loads and parses the bot configuration file with the given name from the repo on Github.
 * The file is assumed to be in YML format.
 */
export async function loadBotConfig(
  filename: string,
  context: probot.Context<webhooks.WebhookPayloadPush>
): Promise<any> {
  const repoName = getRepoBranchSha(context)

  // load the file from GitHub
  let configFileData: LoadFileResult
  try {
    configFileData = await loadFile(filename, context)
  } catch (e) {
    console.log(`${repoName}: NO ${filename} FOUND`)
    return {}
  }

  // parse the file content
  try {
    const result = yml.safeLoad(configFileData.content)
    console.log(`${repoName}: BOT CONFIG: ${JSON.stringify(result)}`)
    return result
  } catch (e) {
    console.log(`${repoName}: ERROR PARSING ${filename}:`, e.message)
  }
}
