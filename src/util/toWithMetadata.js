import { fileNameRegExp, fileExtensionRegExp } from '../constants'

export default function toWithMetadata ({ pathToFiles: { absolute, relativeFromRoutes }, paths }) {
  return paths.map(path => ({
    name: path.match(fileNameRegExp)[1],
    extension: path.match(fileExtensionRegExp)[2],
    path: {
      relativeFromFiles: path.replace(absolute, '').replace(fileNameRegExp, '').replace(fileExtensionRegExp, ''),
      relativeFromRoutes,
    },
  }))
}