import * as probot from "probot"
import { GitHubAPI } from "probot/lib/github"

export interface FileToCreate {
  path: string
  content: string
}

export async function createCommit(
  org: string,
  repo: string,
  branch: string,
  message: string,
  files: FileToCreate[],
  github: GitHubAPI
) {
  console.log(
    `COMMITTING ${files.length} files into the '${branch}' branch of '${repo}' in '${org}'`
  )

  // get the SHA of the latest commit in the branch
  const { data: refData } = await github.git.getRef({
    owner: org,
    ref: `heads/${branch}`,
    repo
  })
  const currentCommitSha = refData.object.sha

  // get the SHA of the tree
  const { data: commitData } = await github.git.getCommit({
    commit_sha: currentCommitSha,
    owner: org,
    repo,
  })
  const treeSha = commitData.tree.sha

  // upload the files
  const fileBlobs: probot.Octokit.GitCreateBlobResponse[] = []
  for (const file of files) {
    const response = await github.git.createBlob({
      content: file.content,
      encoding: "utf-8",
      owner: org,
      repo,
    })
    fileBlobs.push(response.data)
  }

  // create the new tree
  const params: probot.Octokit.GitCreateTreeParamsTree[] = [
    {
      mode: "100644",
      path: 'foo.md',
      sha: '',
      type: "blob",
    }
  ]

  // create the new commit
  const newCommitSha = github.createCommit({
    message,
    owner: org,
    parents: [""]
    repo,
    tree: "",
  })

  // update the branch
}
