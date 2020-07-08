import { readdirSync, lstatSync } from 'fs'

export default function filesToRoutes ({ router, pathToFiles }) {
  const { absolute, relativeFromRoutes } = pathToFiles,
        paths = toPaths(absolute),
        withMetadata = toWithMetadata({ pathToFiles, paths }),
        withRouterFormatting = withMetadata.map(fileMetadata => toFormattedRoute({ fileMetadata, router })).join(',')
  
  return `export default [${withRouterFormatting}]`
}

// Exported for testing
const fileNameRegExp = /([\w\d-]+)\.\w+$/,
      fileExtensionRegExp = /(\.)(\w+)$/,
      dirNameRegExp = /([\w\d-])/
export function toWithMetadata ({ pathToFiles: { absolute, relativeFromRoutes }, paths }) {
  return paths.map(path => ({
    name: path.match(fileNameRegExp)[1],
    extension: path.match(fileExtensionRegExp)[2],
    path: {
      relativeFromFiles: path.replace(absolute, '').replace(fileNameRegExp, '').replace(fileExtensionRegExp, ''),
      relativeFromRoutes,
    },
  }))
}


// Exported for testing
export function toPaths (absolute) {
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

// Exported for testing
const toFormattedRouteByRouter = {
  vue: ({ name, extension, path: { relativeFromFiles, relativeFromRoutes }}) => `{ path: '${relativeFromFiles}${name}', name: '${name}', component: import('${relativeFromRoutes}${relativeFromFiles}${name}.${extension}') }`,
  react: ({ name, extension, path: { relativeFromFiles, relativeFromRoutes }}) => `{ path: '${relativeFromFiles}${name}', component: import('${relativeFromRoutes}${relativeFromFiles}${name}.${extension}') }`
}
export function toFormattedRoute({ fileMetadata, router }) {
  return toFormattedRouteByRouter[router.toLowerCase()](fileMetadata)
}
