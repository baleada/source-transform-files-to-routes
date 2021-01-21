import { toFilesDir, toIds, toMetadata, toImport, toRoute } from './util'
import { resolve } from 'path'

export default function createTransform (router, options = {}) {
  const { include = '**', exclude = '**/.**', test: rawTest, transformPath = path => path, importPath = 'absolute', importType = 'dynamic' } = options,
        test = resolveTest(include, exclude, rawTest)
  
  return ({ id: rawId }) => {
    const id = rawId.startsWith(basePath) ? rawId : `${basePath}/${rawId.replace(/^\//, '')}`,
          filesDir = toFilesDir(id),
          ids = toIds({ filesDir, test }),
          metadata = toMetadata({ filesDir, ids }),
          imports = metadata.map(fileMetadata => toImport({ fileMetadata, importPath, importType })).join('\n') + '\n',
          routes = metadata.map(fileMetadata => toRoute({ fileMetadata, router, transformPath })).join(',')
      
    return `${imports}export default [${routes}]`
  }
}

function resolveTest (include, exclude, test) {
  return typeof test === 'function'
    ? test
    : ({ id, createFilter }) => createFilter(include, exclude)(id)
}

const basePath = resolve('')
