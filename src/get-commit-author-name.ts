import webhooks from '@octokit/webhooks'
import * as probot from 'probot'

/** Returns the username for the head commit of the given Github event. */
export function getCommitAuthorName(
  context: probot.Context<webhooks.WebhookPayloadPush>
): string {
  // NOTE: have to type cast here because octokit types say head_commit is always null here
  const head = context.payload.head_commit as any
  return head.committer.username
}
