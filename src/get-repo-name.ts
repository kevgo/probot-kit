import webhooks from "@octokit/webhooks"
import * as probot from "probot"

/** Returns the name of the repository in which the activity described by the context happens. */
export function getRepoName(
  context: probot.Context<webhooks.WebhookPayloadPush>
): string {
  return context.payload.repository.full_name
}
