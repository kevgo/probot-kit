# ProbotKit

_A collection of high-level tools to build Github bots using [Probot](https://probot.github.io)._

- **getBranchName(context: Context): string**:
  determines the name of the branch that got pushed to Github
- **getRepoName(context: Context): string**:
  returns the name of the repository in which the activity described by the context happens,
  in the format {repoName}/{branchName}
