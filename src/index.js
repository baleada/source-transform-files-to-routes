import { toPaths, toWithMetadata, toFormattedRoute } from './util'

export default function getTransform ({ router, pathToFiles }) {
  const { absolute } = pathToFiles,
        paths = toPaths(absolute),
        withMetadata = toWithMetadata({ pathToFiles, paths }),
        withRouterFormatting = withMetadata.map(fileMetadata => toFormattedRoute({ fileMetadata, router })).join(',')
  
  return () => `export default [${withRouterFormatting}]`
}
