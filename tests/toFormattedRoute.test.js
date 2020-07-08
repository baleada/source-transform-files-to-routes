import test from 'ava'
import { toFormattedRoute } from '../src/util'

const topLevelFileMetadataStub = {
        name: 'Baleada',
        extension: 'js',
        path: {
          relativeFromFiles: '/',
          relativeFromRoutes: '../components',
        },
      },
      nestedFileMetadataStub = {
        name: 'Baleada',
        extension: 'js',
        path: {
          relativeFromFiles: '/nested/',
          relativeFromRoutes: '../components',
        },
      }

test('formats top-level Vue routes', t => {
  const value = toFormattedRoute({ fileMetadata: topLevelFileMetadataStub, router: 'vue' }),
        expected = "{ path: '/Baleada', name: 'Baleada', component: import('../components/Baleada.js') }"

  t.is(value, expected)
})

test('formats nested Vue routes', t => {
  const value = toFormattedRoute({ fileMetadata: nestedFileMetadataStub, router: 'vue' }),
        expected = "{ path: '/nested/Baleada', name: 'Baleada', component: import('../components/nested/Baleada.js') }"

  t.is(value, expected)
})
