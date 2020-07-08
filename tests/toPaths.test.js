import test from 'ava'
import { toPaths } from '../src/util'

test('recurses through child folders', t => {
  const value = toPaths('tests/stubs/files'),
        expected = [
          'tests/stubs/files/bar/baz.md',
          'tests/stubs/files/bar/qux/poop.vue',
          'tests/stubs/files/foo.js',
        ]

  t.deepEqual(value, expected)
})