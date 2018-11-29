import request from 'request-promise-native'

// Exports an async function that downloads the patch for the given SHA.
export default async function(
  org: string,
  repo: string,
  pullRequestNumber: string
): Promise<string> {
  const requestData = {
    headers: {
      Accept: 'application/vnd.github.v3.diff',
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      'User-Agent': 'Markdown-check-bot'
    },
    uri: `https://api.github.com/repos/${org}/${repo}/pulls/${pullRequestNumber}`
  }
  const patchText = await request(requestData)
  return patchText
}
