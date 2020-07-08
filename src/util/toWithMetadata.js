import { customAlphabet } from 'nanoid'
import { lowercase, uppercase } from 'nanoid-dictionary'
import { fileNameRegExp, fileExtensionRegExp } from '../constants'

const nanoid = customAlphabet(`${lowercase}${uppercase}`, 21) // 21 is nanoid default

export default function toWithMetadata ({ pathToFiles: { absolute, relativeFromRoutes }, paths }) {
  return paths.map(path => ({
    name: path.match(fileNameRegExp)[1],
    extension: path.match(fileExtensionRegExp)[2],
    id: nanoid(),
    path: {
      relativeFromFiles: path.replace(absolute, '').replace(fileNameRegExp, '').replace(fileExtensionRegExp, ''),
      relativeFromRoutes,
    },
  }))
}