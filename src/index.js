import { readdirSync, lstatSync } from 'fs'

const fileNameRegExp = /([\w\d-])\.\w+$/,
      fileExtensionRegExp = /(\.)(\w+)$/,
      dirNameRegExp = /([\w\d-])/,

export default function fromDirToRoutes ({ router, pathToDir: { absolute, relativeFromRoutes } }) {
  const paths = toPaths(absolute),
        withMetadata = paths.map(path => ({
          name: path.match(fileNameRegExp)[1],
          extension: path.match(fileExtensionRegExp)[2],
          path = {
            relativeFromDir: path.replace(absolute, '').replace(fileNameRegExp, '').replace(fileExtensionRegExp, ''),
            relativeFromRoutes,
          }
          
        })),
        withRouterFormatting = withMetadata.map(fileMetadata => toFormattedRoute({ fileMetadata, router })).join(',')
  
  return `export default [${withRouterFormatting}]`
}

function toPaths (absolute) {
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

function toFormattedRoute({ fileMetadata, router }) {
  return toFormattedRouteByRouter[router](fileMetadata)
}

const toFormattedRouteByRouter = {
  vue: ({ name, extension, path: { relativeFromDir, relativeFromRoutes }}) => `{ path: '/${relativeFromDir}/${name}', name: '${name}', component: import('${relativeFromRoutes}/${name}.${extension}') }`
}