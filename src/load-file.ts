import webhooks from "@octokit/webhooks"
import * as probot from "probot"
import { getBranchName } from "./get-branch-name"

/** LoadFileResult contains the data about a file loaded from github.com. */
export interface LoadFileResult {
  content: string
  sha: string
}

/**
 * Loads the given file from GitHub.
 * Returns the content and the SHA.
 */
export async function loadFile(
  filepath: string,
  context: probot.Context<webhooks.WebhookPayloadPush>
): Promise<LoadFileResult> {
  const content = await context.github.repos.getContents(
    context.repo({ path: filepath, ref: getBranchName(context) })
  )
  return {
    content: Buffer.from(content.data.content, "base64").toString(),
    sha: content.data.sha
  }
}
