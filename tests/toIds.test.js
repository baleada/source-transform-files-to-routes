import test from 'ava'
import { toIds } from '../src/util'
import { resolve } from 'path'

const basePath = resolve(''),
      defaultTest = ({ id, createFilter }) => createFilter('**', '**/.**')(id)

test('recurses through child folders', t => {
  const value = toIds({ filesDir: `${basePath}/tests/stubs/files`, test: defaultTest }),
        expected = [
          `${basePath}/tests/stubs/files/bar/baz.md`,
          `${basePath}/tests/stubs/files/bar/index.js`,
          `${basePath}/tests/stubs/files/bar/qux/poop.vue`,
          `${basePath}/tests/stubs/files/foo.js`,
        ]

  t.deepEqual(value, expected)
})
