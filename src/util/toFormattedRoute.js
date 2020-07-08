const toFormattedRouteByRouter = {
  vue: ({ name, extension, path: { relativeFromFiles, relativeFromRoutes }}) => `{ path: '${relativeFromFiles}${name}', name: '${name}', component: import('${relativeFromRoutes}${relativeFromFiles}${name}.${extension}') }`,
  react: ({ name, extension, path: { relativeFromFiles, relativeFromRoutes }}) => `{ path: '${relativeFromFiles}${name}', component: import('${relativeFromRoutes}${relativeFromFiles}${name}.${extension}') }`
}

export default function toFormattedRoute({ fileMetadata, router }) {
  return toFormattedRouteByRouter[router.toLowerCase()](fileMetadata)
}
