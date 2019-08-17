import webhooks from "@octokit/webhooks"
import * as probot from "probot"

/** Returns all files of the current commit. */
export async function currentCommitFiles(
  context: probot.Context<webhooks.WebhookPayloadPush>
): Promise<any[]> {
  const changes = await context.github.repos.compareCommits(
    context.repo({
      base: context.payload.before,
      head: context.payload.after
    })
  )
  return changes.data.files
}
