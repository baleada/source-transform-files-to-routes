import test from 'ava'
import { toRoute } from '../src/util'
import { topLevel, nested } from './stubs/fileMetadata.js'

test('formats top-level Vue routes', t => {
  const value = toRoute({ fileMetadata: topLevel, router: 'vue' }),
        expected = "{ path: '/Baleada', name: 'Baleada', component: ABC }"

  t.is(value, expected)
})

test('formats nested Vue routes', t => {
  const value = toRoute({ fileMetadata: nested, router: 'vue' }),
        expected = "{ path: '/nested/Baleada', name: 'Baleada', component: ABC }"

  t.is(value, expected)
})
