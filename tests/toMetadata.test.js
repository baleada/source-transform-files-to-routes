import test from 'ava'
import { toPaths, toMetadata } from '../src/util'

const dirStub = 'tests/stubs/files',
      paths = toPaths({ dir: dirStub, include: ['*'], exclude: [] }) // Tested separately

test('extracts metadata from paths', t => {
  const metadata = toMetadata({
          dir: dirStub,
          paths,
        }),
        value = metadata.map(({ id, ...rest }) => rest),
        ids = metadata.map(({ id }) => id),
        expected = [
          {
            name: 'baz',
            extension: 'md',
            relativePathFromIndex: './bar/',
          },
          {
            name: 'poop',
            extension: 'vue',
            relativePathFromIndex: './bar/qux/',
          },
          {
            name: 'foo',
            extension: 'js',
            relativePathFromIndex: './',
          },
          {
            extension: 'js',
            name: 'routes',
            relativePathFromIndex: './',
          },
        ]

  t.assert(ids.every(id => id.length === 21 && !/[^\w]/.test(id)))
  t.deepEqual(value, expected)
})