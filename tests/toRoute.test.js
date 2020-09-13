import test from 'ava'
import { toRoute } from '../src/util'
import { topLevel, nested } from './stubs/fileMetadata.js'

test('formats top-level Vue routes', t => {
  const value = toRoute({ fileMetadata: topLevel, router: 'vue', transformRoute: route => route }),
        expected = "{ path: '/Baleada', component: ABC }"

  t.is(value, expected)
})

test('formats nested Vue routes', t => {
  const value = toRoute({ fileMetadata: nested, router: 'vue', transformRoute: route => route }),
        expected = "{ path: '/nested/Baleada', component: ABC }"

  t.is(value, expected)
})

test('includes path prefix', t => {
  const value = toRoute({ fileMetadata: topLevel, router: 'vue', transformRoute: route => `${route.replace(/^\//, '')}` }),
        expected = "{ path: 'Baleada', component: ABC }"

  t.is(value, expected)
})
