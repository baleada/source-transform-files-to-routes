// Maintains parity with source-transform-files-to-index/src/util/toIds.js
import { readdirSync, readFileSync, statSync } from 'fs'
import { createFilter } from '@rollup/pluginutils'

export default function toIds ({ filesDir, test }) {
  return readdirSync(filesDir)
    .filter(item => {
      return (
        !isFile({ dir: filesDir, item }) ||
        test({ source: () => readFileSync(`${filesDir}/${item}`, 'utf8'), id: `${filesDir}/${item}`, createFilter })
      )
    })
    .reduce((files, item) => {
      item = isFile({ dir: filesDir, item }) ? [`${filesDir}/${item}`] : toIds({ filesDir: `${filesDir}/${item}`, test })
      return [
        ...files,
        ...item
      ]
    }, [])
}

function isFile ({ dir, item }) {
  return statSync(`${dir}/${item}`).isFile()
}
