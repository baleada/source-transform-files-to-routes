// Maintains parity with source-transform-files-to-index/src/util/toFilesDir.js

import { parse } from 'path'
import { existsSync } from 'fs'

// Returns absolute path to dir
export default function toFilesDir (id) {
  let dir
  switch (looksLike(id)) {
  case 'file':
    dir = fromFile(id)
    break
  case 'dir':
    // If it looks like a dir and exists, it's a dir.
    //
    // If it looks like a dir but doesn't exist, it's a
    // fuzzy path to a virtual file
    dir = existsSync(id) ? id : fromFile(id)
    break
  }

  return dir
}

// ...index.js --> 'file'
// ...index --> 'dir'
function looksLike (id) {
  const { base, ext } = parse(id)
  return (base && ext) ? 'file' : 'dir'
}

function fromFile (id) {
  const { base } = parse(id),
        baseRE = new RegExp(`/${base}$`)
  return id.replace(baseRE, '')
}
