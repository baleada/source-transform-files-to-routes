import { toPaths, toWithMetadata, toImport, toRoute } from './util'

export default function getTransform ({ router, pathToFiles }) {
  const { absolute } = pathToFiles,
        paths = toPaths(absolute),
        withMetadata = toWithMetadata({ pathToFiles, paths }),
        imports = withMetadata.map(toImport).join('\n') + '\n',
        routes = withMetadata.map(fileMetadata => toRoute({ fileMetadata, router })).join(',')
  
  return () => `${imports}export default [${routes}]`
}
