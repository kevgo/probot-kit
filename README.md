# ProbotKit

_A collection of high-level tools to build Github bots using [Probot](https://probot.github.io)._

<a textrun="all-exported">

- **function getBranchName(context: Context): string:**
  determines the name of the branch that got pushed to Github
- **function getRepoBranchName(context: Context): string**
  returns the name of the repository in which the activity described by the context happens,
  in the format {repoName}/{branchName}
- **async function iterateCurrentCommitFiles(context: Context, processor: (any) => void):**
  iterates all files of the current commit
- **async function loadBotConfig(filename: string, context: Context):**
  Loads the bot configuration file with the given name.
  The file is assumed to be in YML format.
  Returns the file content as a JS object.
- **async function loadFile(filepath: string, context: Context):**
  Loads the given file from GitHub.
  Returns the content and the SHA.
- **async function updateFile(filename: string, text: string, sha: string, context: Context):**
  stores the updated content for the given file in the given branch

</a>
