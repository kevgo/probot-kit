import { Context } from 'probot'
import getBranchName from './get-branch-name'
import getRepoName from './get-repo-name'

// Returns the name of the repository in which the activity described by the context happens,
// in the format {repoName}/{branchName}.
export default function(context: Context): string {
  return getRepoName(context) + '/' + getBranchName(context)
}
