import Webhooks from '@octokit/webhooks'
import * as probot from 'probot'

// returns the name of the repository in which the activity described by the context happens
export default function(
  context: probot.Context<Webhooks.WebhookPayloadPush>
): string {
  return context.payload.repository.full_name
}
