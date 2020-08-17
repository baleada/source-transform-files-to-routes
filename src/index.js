import { toFilesDir, toIds, toMetadata, toImport, toRoute } from './util'

export default function getTransform (router, options = {}) {
  const { include = '**', exclude = '**/.**', test: rawTest, routePathPrefix = '', importType = 'absolute' } = options,
        test = resolveTest(include, exclude, rawTest)
  
  return ({ id }) => {
    const filesDir = toFilesDir(id),
          ids = toIds({ filesDir, test }),
          metadata = toMetadata({ filesDir, ids }),
          imports = metadata.map(fileMetadata => toImport({ fileMetadata, importType })).join('\n') + '\n',
          routes = metadata.map(fileMetadata => toRoute({ fileMetadata, router, routePathPrefix })).join(',')
      
    return `${imports}export default [${routes}]`
  }
}

function resolveTest (include, exclude, test) {
  return typeof test === 'function'
    ? test
    : ({ id, createFilter }) => createFilter(include, exclude)(id)
}
