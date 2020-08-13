const toRouteByRouter = {
  vue: ({ fileMetadata: { name, id, relativePathFromIndex }, pathPrefix }) => `{ path: '${pathPrefix}${relativePathFromIndex.replace(/^\./, '')}${name}', name: '${name}', component: ${id} }`,
  react: ({ fileMetadata: { name, id, relativePathFromIndex }, pathPrefix }) => `{ path: '${pathPrefix}${relativePathFromIndex.replace(/^\./, '')}${name}', component: ${id} }`
}

export default function toRoute({ fileMetadata, router, pathPrefix }) {
  return toRouteByRouter[router.toLowerCase()]({ fileMetadata, pathPrefix })
}
