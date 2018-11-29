import { Context } from 'probot'

// Returns the name of the repository in which the activity described by the context happens,
// in the format {repoName}/{branchName}.
export default function(context: Context): string {
  return context.payload.repository.full_name
}
