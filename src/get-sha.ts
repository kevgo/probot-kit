import webhooks from "@octokit/webhooks"
import * as probot from "probot"

/** Returns the SHA1 of the head commit for the given Github event. */
export function getSha(
  context: probot.Context<webhooks.WebhookPayloadPush>
): string {
  return context.payload.after
}
