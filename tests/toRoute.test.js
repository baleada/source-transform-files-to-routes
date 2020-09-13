import test from 'ava'
import { toRoute } from '../src/util'
import { topLevel, nested } from './stubs/fileMetadata.js'

test('formats top-level Vue routes', t => {
  const value = toRoute({ fileMetadata: topLevel, router: 'vue', transformPath: path => path }),
        expected = "{ path: '/Baleada', component: ABC }"

  t.is(value, expected)
})

test('formats nested Vue routes', t => {
  const value = toRoute({ fileMetadata: nested, router: 'vue', transformPath: path => path }),
        expected = "{ path: '/nested/Baleada', component: ABC }"

  t.is(value, expected)
})

test('includes path prefix', t => {
  const value = toRoute({ fileMetadata: topLevel, router: 'vue', transformPath: path => `${path.replace(/^\//, '')}` }),
        expected = "{ path: 'Baleada', component: ABC }"

  t.is(value, expected)
})
