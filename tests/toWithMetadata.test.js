import test from 'ava'
import { toPaths, toWithMetadata } from '../src/util'

const absoluteStub = 'tests/stubs/files',
      relativeFromRoutesStub = '../example/path',
      paths = toPaths(absoluteStub) // Tested separately

test('extracts metadata from paths', t => {
  const value = toWithMetadata({
          pathToFiles: {
            absolute: absoluteStub,
            relativeFromRoutes: relativeFromRoutesStub,
          },
          paths
        }),
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

  t.deepEqual(value, expected)
})