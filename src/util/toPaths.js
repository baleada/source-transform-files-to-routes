// Maintains parity with source-transform-files-to-index/src/util/toPaths.js

import { resolve } from 'path'
import { readdirSync, readFileSync, lstatSync } from 'fs'
import { createFilter } from '@rollup/pluginutils'

export default function toPaths ({ dir, test }) {
  const basePath = resolve('')

  return readdirSync(dir)
    .filter(item => {
      return (
        !isFile({ dir, item }) ||
        test({ source: readFileSync(`${dir}/${item}`, 'utf8'), id: `${basePath}/${dir}/${item}`, createFilter })
      )
    })
    .reduce((files, item) => {
      item = isFile({ dir, item }) ? [`${dir}/${item}`] : toPaths({ dir: `${dir}/${item}`, test })
      return [
        ...files,
        ...item
      ]
    }, [])
}

function isFile ({ dir, item }) {
  return lstatSync(`${dir}/${item}`).isFile()
}

