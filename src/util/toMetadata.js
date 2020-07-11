import { customAlphabet } from 'nanoid'
import { lowercase, uppercase } from 'nanoid-dictionary'
import { fileNameRegExp, fileExtensionRegExp } from '../constants'

const nanoid = customAlphabet(`${lowercase}${uppercase}`, 21) // 21 is nanoid default

export default function toMetadata ({ dir, paths }) {
  return paths.map(path => ({
    name: path.match(fileNameRegExp)[1],
    extension: path.match(fileExtensionRegExp)[1],
    relativePathFromIndex: '.' + path.replace(dir, '').replace(fileNameRegExp, '').replace(fileExtensionRegExp, ''),
    id: nanoid(),
  }))
}