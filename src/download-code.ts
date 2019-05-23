import { https } from 'follow-redirects'
import gunzip from 'gunzip-maybe'
import os from 'os'
import path from 'path'
import tar from 'tar-stream'
import { createRequestData } from './download-code-helpers/create-request-data'
import { TarUnpacker } from './download-code-helpers/unpacker'

// Downloads the given SHA and extracts it into a tmp directory.
// Returns the directory if successful.
export function downloadCode(
  organization,
  repository,
  sha,
  debug
): Promise<string> {
  console.log('DOWNLOADING:', sha)
  return new Promise((resolve, reject) => {
    const requestData = createRequestData(organization, repository, sha)
    // TODO: make async
    const request = https.get(requestData, res => {
      const tarExtractor = tar.extract()
      const unpacker = new TarUnpacker(debug)
      tarExtractor.on('entry', unpacker.unpackEntry.bind(unpacker))
      tarExtractor.on('error', reject)
      tarExtractor.on('finish', function() {
        resolve(path.join(os.tmpdir(), `${organization}-${repository}-${sha}`))
      })
      res.pipe(gunzip()).pipe(tarExtractor)
    })
    request.on('error', reject)
  })
}
