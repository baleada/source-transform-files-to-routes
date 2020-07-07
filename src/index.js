import { readdirSync } from 'fs'

export default function fromDirToRoutes ({ router, dir }) {
  const routes = readdirSync(dir),
        withoutExtensions = routes.map(page => page.replace(/\.\w+$/, '')),
        withRouterFormatting = withoutExtensions.map(name => toFormattedRoute({ name, router }))
  
  return `export default [${withRouterFormatting}]`
}

function toFormattedRoute({ name, router }) {
  return toFormattedRoutes[router](name)
}

const toFormattedRoutes = {
  vue: name => `{ path: '/${name}', name: '${name}', component: import('../tests/${name}.vue') }`
}