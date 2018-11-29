# ProbotKit

[![CircleCI](https://circleci.com/gh/kevgo/probot-kit.svg?style=shield)](https://circleci.com/gh/kevgo/probot-kit)

_A collection of high-level tools to build Github bots using [Probot](https://probot.github.io)._

<a textrun="all-exported">

- **async function downloadPatch(org: string, repo: string, pullRequestNumber: string): Promise&lt;string&gt;:**
  exports an async function that downloads the patch for the given SHA

- **function findPatchLine(patchText: string, filename: string, lineNumber: number): number | undefined:**
  Takes a line number in a file
  and returns the corresponding line number in the patch file
  according to https://developer.github.com/v3/pulls/comments/#create-a-comment
  or falsy if the patch doesn't contain the given line number.
  The patch must be downloaded by the downloadPatch function.

* **function getBranchName(context: Context): string:**
  determines the name of the branch that got pushed to Github

* **function getRepoBranchName(context: Context): string:**
  returns the name of the repository in which the activity described by the context happens,
  in the format {repoName}/{branchName}

* **function getRepoName(context: Context): string:**
  Returns the name of the repository in which the activity described by the context happens,
  in the format {repoName}/{branchName}.

* **async function iterateCurrentCommitFiles(context: Context, processor: (file: any) => void):**
  iterates all files of the current commit

* **async function loadBotConfig(filename: string, context: Context): Promise&lt;any&gt;:**
  Loads the bot configuration file with the given name.
  The file is assumed to be in YML format.
  Returns the file content as a JS object.

* **async function loadFile(filepath: string, context: Context): Promise&lt;[string, string]&gt;:**
  Loads the given file from GitHub.
  Returns the content and the SHA.

* **async function updateFile(filename: string, text: string, sha: string, context: Context):**
  stores the updated content for the given file in the given branch

</a>
