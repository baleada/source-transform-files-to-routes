import test from 'ava'
import { toImport } from '../src/util'
import { topLevel, nested } from './stubs/fileMetadata.js'
import { resolve } from 'path'

const basePath = resolve('')

test('imports top-level files', t => {
  const value = toImport({ fileMetadata: topLevel, importType: 'absolute' }),
        expected = `import ABC from '${basePath}/Baleada.js'`

  t.is(value, expected)
})

test('imports nested files', t => {
  const value = toImport({ fileMetadata: nested, importType: 'absolute' }),
        expected = `import ABC from '${basePath}/nested/Baleada.js'`

  t.is(value, expected)
})

test('can import from paths relative from index', t => {
  const value = toImport({ fileMetadata: nested, importType: 'relativeFromIndex' }),
        expected = "import ABC from './nested/Baleada.js'"

  t.is(value, expected)
})

test('can import from paths relative from root', t => {
  const value = toImport({ fileMetadata: nested, importType: 'relativeFromRoot' }),
        expected = "import ABC from '/nested/Baleada.js'"

  t.is(value, expected)
})
