import test from 'ava'
import { toPaths, toWithMetadata } from '../src/util'

const absoluteStub = 'tests/stubs/files',
      relativeFromRoutesStub = '../example/path',
      paths = toPaths(absoluteStub) // Tested separately

test('extracts metadata from paths', t => {
  const withMetadata = toWithMetadata({
          pathToFiles: {
            absolute: absoluteStub,
            relativeFromRoutes: relativeFromRoutesStub,
          },
          paths
        }),
        value = withMetadata.map(({ id, ...rest }) => rest),
        ids = withMetadata.map(({ id }) => id),
        expected = [
          {
            name: 'baz',
            extension: 'md',
            path: {
              relativeFromFiles: '/bar/',
              relativeFromRoutes: relativeFromRoutesStub,
            }
          },
          {
            name: 'poop',
            extension: 'vue',
            path: {
              relativeFromFiles: '/bar/qux/',
              relativeFromRoutes: relativeFromRoutesStub,
            }
          },
          {
            name: 'foo',
            extension: 'js',
            path: {
              relativeFromFiles: '/',
              relativeFromRoutes: relativeFromRoutesStub,
            }
          },
        ]

  t.assert(ids.every(id => id.length === 21 && !/[^\w]/.test(id)))
  t.deepEqual(value, expected)
})