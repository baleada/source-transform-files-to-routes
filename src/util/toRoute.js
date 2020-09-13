import { clipable } from '@baleada/logic'

const toRouteByRouter = {
  vue: ({ fileMetadata: { name, id, path: { relativeFromIndex } }, transformRoute }) => `{ path: '${transformRoute(clipable(relativeFromIndex).clip(/^\./) + name)}', component: ${id} }`,
  react: ({ fileMetadata: { name, id, path: { relativeFromIndex } }, transformRoute }) => `{ path: '${transformRoute(clipable(relativeFromIndex).clip(/^\./) + name)}', component: ${id} }`
}

export default function toRoute({ fileMetadata, router, transformRoute }) {
  return toRouteByRouter[router.toLowerCase()]({ fileMetadata, transformRoute })
}
