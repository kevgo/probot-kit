// Creates the request data for Github
export default function createRequestData(
  organization: string,
  repository: string,
  sha: string
) {
  // NOTE: context.github.repos.getArchiveLink
  // causes a 400 (Bad Request) error,
  // so we have to manually create a download URL here :(
  // TODO: see if an updated version of the library fixes this
  return {
    headers: {
      Accept: 'application/vnd.github.v3.raw',
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      'User-Agent': 'Markdown-check-bot'
    },
    hostname: 'api.github.com',
    path: `/repos/${organization}/${repository}/tarball/${sha}`
  }
}
