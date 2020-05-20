# ProbotKit

[![CircleCI](https://circleci.com/gh/kevgo/probot-kit.svg?style=shield)](https://circleci.com/gh/kevgo/probot-kit)
[![install size](https://packagephobia.now.sh/badge?p=probot-kit)](https://packagephobia.now.sh/result?p=probot-kit)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/kevgo/probot-kit.svg)](https://lgtm.com/projects/g/kevgo/probot-kit/context:javascript)

_A collection of high-level tools to build Github bots using
[Probot](https://probot.github.io)._

<a textrun="all-exported">

- **[downloadCode](src/download-code.ts)** <br> downloads the given SHA and
  extracts it into a tmp directory

- **[downloadPullrequestPatch](src/download-pullrequest-patch.ts)** <br>
  downloads the patch for the given pull request

- **[findPatchLine](src/find-patch-line.ts)** <br> Takes a line number in a file
  and a patch downloaded by the downloadPatch function. Returns the line number
  that Github expects for comments on this patch according to
  https://developer.github.com/v3/pulls/comments/#create-a-comment. Returns
  `undefined` if the patch doesn't contain the given line number.

</a>
