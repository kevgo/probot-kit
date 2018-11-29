# ProbotKit

[![CircleCI](https://circleci.com/gh/kevgo/probot-kit.svg?style=shield)](https://circleci.com/gh/kevgo/probot-kit)

_A collection of high-level tools to build Github bots using [Probot](https://probot.github.io)._

<a textrun="all-exported">

- **[downloadPullrequestPatch](src/download-pullrequest-patch.ts)** <br>
  downloads the patch for the given pull request

- **[findPatchLine](src/find-patch-line.ts)** <br>
  Takes a line number in a file and a patch downloaded by the downloadPatch function.
  Returns the line number that Github expects for comments on this patch
  according to https://developer.github.com/v3/pulls/comments/#create-a-comment.
  Returns `undefined` if the patch doesn't contain the given line number.

* **[getBranchName](src/get-branch-name.ts)** <br>
  determines the name of the branch involved in the given Github event

* **[getRepoBranchName](src/get-repo-branch-name.ts)** <br>
  returns the name of the repository in which the activity described by the context happens,
  in the format {repoName}/{branchName}

* **[getRepoName](src/get-repo-name.ts)** <br>
  Returns the name of the repository in which the activity described by the context happens

* **[iterateCurrentCommitFiles](src/iterate-current-commit-files.ts)** <br>
  iterates all files of the current commit

* **[loadBotConfig](src/load-bot-config.ts)** <br>
  Loads and parses the bot configuration file with the given name from the repo on Github.
  The file is assumed to be in YML format.

* **[loadFile](src/load-file.ts)** <br>
  Loads the given file from GitHub.
  Returns the content and the SHA.

* **[updateFile](src/update-file.ts)** <br>
  updates the file with the given name to the given content in the given branch

</a>
