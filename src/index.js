import { fileNameRegExp, fileExtensionRegExp } from './constants'
import { toPaths, toMetadata, toImport, toRoute } from './util'

export default function getTransform (router, options = {}) {
  const { include = '**', exclude = '**/.**', test: rawTest } = options,
        test = resolveTest(include, exclude, rawTest)
  
  return ({ id }) => {
    const dir = id.replace(fileNameRegExp, '').replace(fileExtensionRegExp, '').replace(/\/$/, ''),
          paths = toPaths({ dir, test }),
          metadata = toMetadata({ dir, paths }),
          imports = metadata.map(toImport).join('\n') + '\n',
          routes = metadata.map(fileMetadata => toRoute({ fileMetadata, router })).join(',')
      
    return `${imports}export default [${routes}]`
  }
}

function resolveTest (include, exclude, test) {
  return typeof test === 'function'
    ? test
    : ({ id, createFilter }) => createFilter(include, exclude)(id)
}
