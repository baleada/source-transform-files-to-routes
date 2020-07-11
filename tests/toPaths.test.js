import test from 'ava'
import { toPaths } from '../src/util'

const defaultIncludeStub = ['*'],
      defaultExcludeStub = []

test('recurses through child folders', t => {
  const value = toPaths({ dir: 'tests/stubs/files', include: defaultIncludeStub, exclude: defaultExcludeStub }),
        expected = [
          'tests/stubs/files/bar/baz.md',
          'tests/stubs/files/bar/qux/poop.vue',
          'tests/stubs/files/foo.js',
          'tests/stubs/files/routes.js',
        ]

  t.deepEqual(value, expected)
})

test('respects include and exclude options', t => {
  const value = toPaths({ dir: 'tests/stubs/files', include: ['baz.md'], exclude: ['poop.vue'] }),
        expected = [
          'tests/stubs/files/bar/baz.md',
        ]

  t.deepEqual(value, expected)
})