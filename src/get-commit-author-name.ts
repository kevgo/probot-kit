import Webhooks from '@octokit/webhooks'
import * as probot from 'probot'

// returns the username for the head commit of the given Github event
export default function getCommitAuthorName(
  context: probot.Context<Webhooks.WebhookPayloadPush>
): string {
  // NOTE: have to type cast here because octokit types say head_commit is always null here
  const head = context.payload.head_commit as any
  return head.committer.username
}
