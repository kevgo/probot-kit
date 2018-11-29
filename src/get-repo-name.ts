import { Context } from 'probot'

// returns the name of the repository in which the activity described by the context happens
export default function(context: Context): string {
  return context.payload.repository.full_name
}
