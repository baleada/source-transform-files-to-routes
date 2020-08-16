import test from 'ava'
import { toIds, toMetadata } from '../src/util'
import { resolve } from 'path'

const basePath = resolve(''),
      filesDirStub = `${basePath}/tests/stubs/files`,
      ids = toIds({ filesDir: filesDirStub, test: ({ id, createFilter }) => createFilter('**', '**/.**')(id) }) // Tested separately

test('extracts metadata from ids', t => {
  const metadata = toMetadata({ filesDir: filesDirStub, ids }),
        value = metadata.map(({ id, ...rest }) => rest),
        nanoids = metadata.map(({ id }) => id),
        expected = [
          {
            name: 'baz',
            extension: 'md',
            path: {
              relativeFromRoot: '/tests/stubs/files/bar/',
              relativeFromIndex: './bar/',
              absolute: `${filesDirStub}/bar/`,
            }
          },
          {
            name: 'index',
            extension: 'js',
            path: {
              relativeFromRoot: '/tests/stubs/files/bar/',
              relativeFromIndex: './bar/',
              absolute: `${filesDirStub}/bar/`,
            }
          },
          {
            name: 'poop',
            extension: 'vue',
            path: {
              relativeFromRoot: '/tests/stubs/files/bar/qux/',
              relativeFromIndex: './bar/qux/',
              absolute: `${filesDirStub}/bar/qux/`,
            }
          },
          {
            name: 'foo',
            extension: 'js',
            path: {
              relativeFromRoot: '/tests/stubs/files/',
              relativeFromIndex: './',
              absolute: `${filesDirStub}/`,
            }
          },
        ]

  t.assert(nanoids.every(id => id.length === 21 && !/[^\w]/.test(id)))
  t.deepEqual(value, expected)
})
