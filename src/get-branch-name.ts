import webhooks from '@octokit/webhooks'
import * as probot from 'probot'

/** Determines the name of the branch involved in the given Github event. */
export function getBranchName(
  context: probot.Context<webhooks.WebhookPayloadPush>
): string {
  return context.payload.ref.replace('refs/heads/', '')
}
