import { fileNameRegExp, fileExtensionRegExp } from './constants'
import { toPaths, toMetadata, toImport, toRoute } from './util'

export default function getTransform (router, options = {}) {
  const { include = ['*'], exclude = [] } = options
  
  return ({ id }) => {
    const dir = id.replace(fileNameRegExp, '').replace(fileExtensionRegExp, '').replace(/\/$/, ''),
          paths = toPaths({ dir, include: resolveAsArray(include), exclude: [id, ...resolveAsArray(exclude)] }),
          metadata = toMetadata({ dir, paths }),
          imports = metadata.map(toImport).join('\n') + '\n',
          routes = metadata.map(fileMetadata => toRoute({ fileMetadata, router })).join(',')
      
    return `${imports}export default [${routes}]`
  }
}

function resolveAsArray (stringOrArray) {
  return Array.isArray(stringOrArray) ? stringOrArray : [stringOrArray]
}