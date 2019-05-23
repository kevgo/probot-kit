import Webhooks from '@octokit/webhooks'
import * as probot from 'probot'

// returns the SHA1 of the head commit for the given Github event
export default function(
  context: probot.Context<Webhooks.WebhookPayloadPush>
): string {
  return context.payload.after
}
