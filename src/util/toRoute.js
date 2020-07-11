const toRouteByRouter = {
  vue: ({ name, id, relativePathFromIndex}) => `{ path: '${relativePathFromIndex}${name}', name: '${name}', component: ${id} }`,
  react: ({ name, id, relativePathFromIndex}) => `{ path: '${relativePathFromIndex}${name}', component: ${id} }`
}

export default function toRoute({ fileMetadata, router }) {
  return toRouteByRouter[router.toLowerCase()](fileMetadata)
}
