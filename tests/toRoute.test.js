import test from 'ava'
import { toRoute } from '../src/util'
import { topLevel, nested } from './stubs/fileMetadata.js'

const defaultPathPrefix = ''

test('formats top-level Vue routes', t => {
  const value = toRoute({ fileMetadata: topLevel, router: 'vue', routePathPrefix: defaultPathPrefix }),
        expected = "{ path: '/Baleada', component: ABC }"

  t.is(value, expected)
})

test('formats nested Vue routes', t => {
  const value = toRoute({ fileMetadata: nested, router: 'vue', routePathPrefix: defaultPathPrefix }),
        expected = "{ path: '/nested/Baleada', component: ABC }"

  t.is(value, expected)
})

test('includes path prefix', t => {
  const value = toRoute({ fileMetadata: topLevel, router: 'vue', routePathPrefix: '/blog' }),
        expected = "{ path: '/blog/Baleada', component: ABC }"

  t.is(value, expected)
})
