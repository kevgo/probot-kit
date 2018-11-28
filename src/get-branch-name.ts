import { Context } from 'probot'

// Determines the name of the branch that got pushed to Github
export default function getBranchName(context: Context): string {
  return context.payload.ref.replace('refs/heads/', '')
}
