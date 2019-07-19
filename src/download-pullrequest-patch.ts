import got from "got"

/** Downloads the patch for the given pull request */
export async function downloadPullrequestPatch(
  org: string,
  repo: string,
  pullRequestNumber: string
): Promise<string> {
  const url = `https://api.github.com/repos/${org}/${repo}/pulls/${pullRequestNumber}`
  const response = await got(url, {
    headers: {
      Accept: "application/vnd.github.v3.diff",
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      "User-Agent": "Markdown-check-bot"
    }
  })
  return response.body
}
