import { Context } from 'probot'

// returns the username for the head commit of the given Github event
export default function(context: Context): string {
  return context.payload.head_commit.committer.username
}
