import Webhooks from '@octokit/webhooks'
import { Context } from 'probot'

// determines the name of the branch involved in the given Github event
export default function(context: Context<Webhooks.WebhookPayloadPush>): string {
  return context.payload.ref.replace('refs/heads/', '')
}
