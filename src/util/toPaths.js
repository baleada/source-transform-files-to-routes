// Maintains parity with source-transform-files-to-index/src/util/toPaths.js

import { resolve } from 'path'
import { readdirSync, readFileSync, lstatSync } from 'fs'
import { createFilter } from '@rollup/pluginutils'

export default function toPaths ({ dir, test }) {
  return readdirSync(dir)
    .filter(item => {
      return (
        !isFile({ dir, item }) ||
        test({ source: readFileSync(`${dir}/${item}`, 'utf8'), id: `${dir}/${item}`, createFilter })
      )
    })
    .reduce((files, item) => [
      ...files,
      ...ensurePaths({ dir, item, test })
    ], [])
}

function ensurePaths ({ dir, item, test }) {
  const basePath = resolve('')
  return isFile({ dir, item }) ? [`${dir.replace(basePath + '/', '')}/${item}`] : toPaths({ dir: `${dir}/${item}`, test })
}

function isFile ({ dir, item }) {
  return lstatSync(`${dir}/${item}`).isFile()
}

