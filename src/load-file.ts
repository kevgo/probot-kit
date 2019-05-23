import Webhooks from '@octokit/webhooks'
import probot from 'probot'
import { getBranchName } from './get-branch-name'

// Loads the given file from GitHub.
// Returns the content and the SHA.
export async function loadFile(
  filepath: string,
  context: probot.Context<Webhooks.WebhookPayloadPush>
): Promise<[string, string]> {
  const content = await context.github.repos.getContents(
    context.repo({ path: filepath, ref: getBranchName(context) })
  )
  return [
    Buffer.from(content.data.content, 'base64').toString(),
    content.data.sha
  ]
}
