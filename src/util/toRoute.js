import { clipable } from '@baleada/logic'

const toRouteByRouter = {
  vue: ({ fileMetadata: { name, id, path: { relativeFromIndex } }, routePathPrefix }) => `{ path: '${routePathPrefix}${clipable(relativeFromIndex).clip(/^\./)}${name}', component: ${id} }`,
  react: ({ fileMetadata: { name, id, path: { relativeFromIndex } }, routePathPrefix }) => `{ path: '${routePathPrefix}${clipable(relativeFromIndex).clip(/^\./)}${name}', component: ${id} }`
}

export default function toRoute({ fileMetadata, router, routePathPrefix }) {
  return toRouteByRouter[router.toLowerCase()]({ fileMetadata, routePathPrefix })
}
