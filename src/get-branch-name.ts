import { Context } from 'probot'

// determines the name of the branch that got pushed to Github
export default function(context: Context): string {
  return context.payload.ref.replace('refs/heads/', '')
}
