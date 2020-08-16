import { resolve } from 'path'
import test from 'ava'
import { toFilesDir } from '../src/util'

const basePath = resolve('')

test('recognizes directories', t => {
  const value = toFilesDir(`${basePath}/tests/stubs/files`),
        expected = `${basePath}/tests/stubs/files`

  t.is(value, expected)
})

test('recognizes files', t => {
  const value = toFilesDir(`${basePath}/tests/stubs/files/foo.js`),
        expected = `${basePath}/tests/stubs/files`

  t.is(value, expected)
})

test('recognizes fuzzy paths to files', t => {
  const value = toFilesDir(`${basePath}/tests/stubs/files/foo`),
        expected = `${basePath}/tests/stubs/files`

  t.is(value, expected)
})
