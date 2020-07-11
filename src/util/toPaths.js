// Maintains parity with source-transform-files-to-index/src/util/toPaths.js

import { readdirSync, lstatSync } from 'fs'
import minimatch from 'minimatch'

export default function toPaths ({ dir, include, exclude }) {
  return readdirSync(dir)
    .filter(item => {
      return (
        !isFile({ dir, item }) ||
        (include.every(pattern => minimatch(item, pattern)) && !exclude.some(pattern => minimatch(item, pattern)))
      )
    })
    .reduce((files, item) => {
      item = isFile({ dir, item }) ? [`${dir}/${item}`] : toPaths({ dir: `${dir}/${item}`, include, exclude })
      return [
        ...files,
        ...item
      ]
    }, [])
}

function isFile ({ dir, item }) {
  return lstatSync(`${dir}/${item}`).isFile()
}
