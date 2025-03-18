# ProbotKit

[![CI](https://github.com/kevgo/probot-kit/actions/workflows/test.yml/badge.svg)](https://github.com/kevgo/probot-kit/actions/workflows/test.yml)
[![install size](https://packagephobia.now.sh/badge?p=probot-kit)](https://packagephobia.now.sh/result?p=probot-kit)

_A collection of high-level tools to build Github bots using
[Probot](https://probot.github.io)._

<a type="all-exported">

- **[downloadCode](src/download-code.ts)** <br> Downloads the given SHA and
  extracts it into a tmp directory. Returns the directory if successful.

- **[downloadPullrequestPatch](src/download-pullrequest-patch.ts)** <br>
  Downloads the patch for the given pull request.

- **[findPatchLine](src/find-patch-line.ts)** <br> Takes a line number in a file
  and a patch downloaded by the downloadPatch function. Returns the line number
  that Github expects for comments on this patch according to
  https://developer.github.com/v3/pulls/comments/#create-a-comment. Returns
  `undefined` if the patch doesn't contain the given line number.

</a>
