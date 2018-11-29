# ProbotKit

[![CircleCI](https://circleci.com/gh/kevgo/probot-kit.svg?style=shield)](https://circleci.com/gh/kevgo/probot-kit)

_A collection of high-level tools to build Github bots using [Probot](https://probot.github.io)._

<a textrun="all-exported">

- **[downloadPatch](src/download-patch.ts)** <br>
  exports an async function that downloads the patch for the given SHA

- **[findPatchLine](src/find-patch-line.ts)** <br>
  Takes a line number in a file
  and returns the corresponding line number in the patch file
  according to https://developer.github.com/v3/pulls/comments/#create-a-comment
  or falsy if the patch doesn't contain the given line number.
  The patch must be downloaded by the downloadPatch function.

* **[getBranchName](src/get-branch-name.ts)** <br>
  determines the name of the branch that got pushed to Github

* **[getRepoBranchName](src/get-repo-branch-name.ts)** <br>
  returns the name of the repository in which the activity described by the context happens,
  in the format {repoName}/{branchName}

* **getRepoName** <br>
  Returns the name of the repository in which the activity described by the context happens,
  in the format {repoName}/{branchName}.

* **iterateCurrentCommitFiles** <br>
  iterates all files of the current commit

* **loadBotConfig** <br>
  Loads the bot configuration file with the given name.
  The file is assumed to be in YML format.
  Returns the file content as a JS object.

* **loadFile** <br>
  Loads the given file from GitHub.
  Returns the content and the SHA.

* **updateFile** <br>
  stores the updated content for the given file in the given branch

</a>
