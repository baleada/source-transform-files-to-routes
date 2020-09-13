import { clipable } from '@baleada/logic'

const toRouteByRouter = {
  vue: ({ fileMetadata: { name, id, path: { relativeFromIndex } }, transformPath }) => `{ path: '${transformPath(clipable(relativeFromIndex).clip(/^\./) + name)}', component: ${id} }`,
  react: ({ fileMetadata: { name, id, path: { relativeFromIndex } }, transformPath }) => `{ path: '${transformPath(clipable(relativeFromIndex).clip(/^\./) + name)}', component: ${id} }`
}

export default function toRoute({ fileMetadata, router, transformPath }) {
  return toRouteByRouter[router.toLowerCase()]({ fileMetadata, transformPath })
}
