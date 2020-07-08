import { readdirSync, lstatSync } from 'fs'
import { fileNameRegExp, dirNameRegExp } from '../constants'

export default function toPaths (absolute) {
  return readdirSync(absolute)
    .filter(item => fileNameRegExp.test(item) || dirNameRegExp.test(item))
    .reduce((files, item) => {
      item = isFile({ absolute, item }) ? [`${absolute}/${item}`] : toPaths(`${absolute}/${item}`)
      return [
        ...files,
        ...item
      ]
    }, [])
}

function isFile ({ absolute, item }) {
  return lstatSync(`${absolute}/${item}`).isFile()
}
