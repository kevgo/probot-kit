import Webhooks from '@octokit/webhooks'
import { Context } from 'probot'
import getBranchName from './get-branch-name'

// updates the file with the given name to the given content in the given branch
export default async function(
  filename: string,
  text: string,
  sha: string,
  context: Context<Webhooks.WebhookPayloadPush>
) {
  await context.github.repos.updateFile(
    context.repo({
      branch: getBranchName(context),
      content: Buffer.from(text).toString('base64'),
      message: `Prettify ${filename}`,
      path: filename,
      sha
    })
  )
}
