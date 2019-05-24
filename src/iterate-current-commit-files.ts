import Webhooks from '@octokit/webhooks'
import probot from 'probot'

/** Iterates all files of the current commit. */
export async function iterateCurrentCommitFiles(
  context: probot.Context<Webhooks.WebhookPayloadPush>,
  processor: (file: any) => void
) {
  const changes = await context.github.repos.compareCommits(
    context.repo({
      base: context.payload.before,
      head: context.payload.after
    })
  )
  return Promise.all(changes.data.files.map(processor))
}
