import Webhooks from '@octokit/webhooks'
import * as probot from 'probot'

// determines the name of the branch involved in the given Github event
export function getBranchName(
  context: probot.Context<Webhooks.WebhookPayloadPush>
): string {
  return context.payload.ref.replace('refs/heads/', '')
}
