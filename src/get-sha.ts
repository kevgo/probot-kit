import Webhooks from '@octokit/webhooks'
import { Context } from 'probot'

// returns the SHA1 of the head commit for the given Github event
export default function(context: Context<Webhooks.WebhookPayloadPush>): string {
  return context.payload.after
}
