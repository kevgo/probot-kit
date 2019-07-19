import webhooks from "@octokit/webhooks"
import * as probot from "probot"
import { getBranchName } from "./get-branch-name"

/** Updates the file with the given name to the given content in the given branch. */
export async function updateFile(
  filename: string,
  text: string,
  sha: string,
  context: probot.Context<webhooks.WebhookPayloadPush>
) {
  await context.github.repos.updateFile(
    context.repo({
      branch: getBranchName(context),
      content: Buffer.from(text).toString("base64"),
      message: `Prettify ${filename}`,
      path: filename,
      sha
    })
  )
}
