import fs from "fs"
import path from "path"
import stream from "stream"
import tar from "tar-stream"

/** Helps unpack a TAR file */
export class TarUnpacker {
  debug: boolean

  constructor(debug: boolean) {
    this.debug = debug
  }

  // called with the data for a TAR file entry
  unpackEntry(
    header: tar.Headers,
    bodyStream: stream.PassThrough,
    rootDir: string,
    next: () => void
  ) {
    const entryPath = path.join(rootDir, header.name)
    if (header.type === "directory") {
      this.extractDirectoryEntry(entryPath, next)
    } else if (header.type === "file") {
      this.extractFileEntry(entryPath, bodyStream, next)
    } else if (header.type === "symlink") {
      this.extractSymlinkEntry(next)
    } else {
      throw new Error(`UNKNOWN HEADER TYPE: ${header.type}`)
    }
  }

  // Creates a directory with the given name.
  // Calls next when done.
  private extractDirectoryEntry(dirPath: string, next: () => void) {
    if (this.debug) {
      console.log("creating directory:", dirPath)
    }
    // TODO: make async
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }
    next()
  }

  // Writes a file containing the content of the given stream at the given path.
  // Calls next when done.
  private extractFileEntry(
    filePath: string,
    bodyStream: stream.PassThrough,
    next: () => void
  ) {
    if (this.debug) {
      console.log("creating file:", filePath)
    }
    const fileStream = fs.createWriteStream(filePath)
    bodyStream.on("end", next)
    bodyStream.pipe(fileStream)
  }

  // We don't process symlinks yet
  private extractSymlinkEntry(next: () => void) {
    next()
  }
}
