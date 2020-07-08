const toRouteByRouter = {
  vue: ({ name, id, path: { relativeFromFiles }}) => `{ path: '${relativeFromFiles}${name}', name: '${name}', component: ${id} }`,
  react: ({ name, id, path: { relativeFromFiles }}) => `{ path: '${relativeFromFiles}${name}', component: ${id} }`
}

export default function toRoute({ fileMetadata, router }) {
  return toRouteByRouter[router.toLowerCase()](fileMetadata)
}
