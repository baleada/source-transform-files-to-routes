import test from 'ava'
import { toPaths } from '../src/util'

const defaultTest = ({ id, createFilter }) => createFilter('**', '**/.**')(id)

test('recurses through child folders', t => {
  const value = toPaths({ dir: 'tests/stubs/files', test: defaultTest }),
        expected = [
          'tests/stubs/files/bar/baz.md',
          'tests/stubs/files/bar/qux/poop.vue',
          'tests/stubs/files/foo.js',
          'tests/stubs/files/routes.js',
        ]

  t.deepEqual(value, expected)
})
