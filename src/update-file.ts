import { Context } from 'probot'
import getBranchName from './get-branch-name'

// Stores the updated content for the given file in the given branch
export default async function(
  filename: string,
  text: string,
  sha: string,
  context: Context
) {
  await context.github.repos.updateFile(
    context.repo({
      branch: getBranchName(context),
      content: Buffer.from(text).toString('base64'),
      message: `Prettify ${filename}`,
      path: filename,
      sha
    })
  )
}
