import { Context } from 'probot'
import getBranchName from './get-branch-name'

// Loads the given file from GitHub.
// Returns the content and the SHA.
export default async function(filepath: string, context: Context) {
  const content = await context.github.repos.getContents(
    context.repo({ path: filepath, ref: getBranchName(context) })
  )
  return [
    Buffer.from(content.data.content, 'base64').toString(),
    content.data.sha
  ]
}
