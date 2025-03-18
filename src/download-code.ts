import got from "got"
import gunzip from "gunzip-maybe"
import * as os from "os"
import * as path from "path"
import tar from "tar-stream"
import { TarUnpacker } from "./download-helpers/unpacker.js"

/**
 * Downloads the given SHA and extracts it into a tmp directory.
 * Returns the directory if successful.
 */
export async function downloadCode(
  organization: string,
  repository: string,
  sha: string,
  debug: boolean
): Promise<string> {
  console.log("DOWNLOADING CODE:", sha)
  const url = `https://api.github.com/repos/${organization}/${repository}/tarball/${sha}`
  const responseStream = await got.stream(url, {
    followRedirect: true,
    headers: {
      Accept: "application/vnd.github.v3.raw",
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      "User-Agent": "Probot-Kit"
    }
  })
  const tarExtractor = tar.extract()
  const unpacker = new TarUnpacker(debug)
  tarExtractor.on("entry", unpacker.unpackEntry.bind(unpacker))
  return new Promise((resolve, reject) => {
    tarExtractor.on("error", reject)
    tarExtractor.on("finish", () => {
      resolve(path.join(os.tmpdir(), `${organization}-${repository}-${sha}`))
    })
    responseStream.pipe(gunzip()).pipe(tarExtractor)
  })
}
