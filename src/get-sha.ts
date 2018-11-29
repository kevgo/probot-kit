import { Context } from 'probot'

// returns the SHA1 of the head commit for the given Github event
export default function(context: Context): string {
  return context.payload.after
}
