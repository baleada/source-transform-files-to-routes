import test from 'ava'
import { toRoute } from '../src/util'
import { topLevel, nested } from './stubs/fileMetadata.js'

const defaultPathPrefix = ''

test('formats top-level Vue routes', t => {
  const value = toRoute({ fileMetadata: topLevel, router: 'vue', pathPrefix: defaultPathPrefix }),
        expected = "{ path: '/Baleada', name: 'Baleada', component: ABC }"

  t.is(value, expected)
})

test('formats nested Vue routes', t => {
  const value = toRoute({ fileMetadata: nested, router: 'vue', pathPrefix: defaultPathPrefix }),
        expected = "{ path: '/nested/Baleada', name: 'Baleada', component: ABC }"

  t.is(value, expected)
})

test('includes path prefix', t => {
  const value = toRoute({ fileMetadata: topLevel, router: 'vue', pathPrefix: '/blog' }),
        expected = "{ path: '/blog/Baleada', name: 'Baleada', component: ABC }"

  t.is(value, expected)
})
