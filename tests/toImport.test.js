import test from 'ava'
import { toImport } from '../src/util'
import { topLevel, nested } from './stubs/fileMetadata.js'

test('formats top-level Vue routes', t => {
  const value = toImport(topLevel),
        expected = "import ABC from '../components/Baleada.js'"

  t.is(value, expected)
})

test('formats nested Vue routes', t => {
  const value = toImport(nested),
        expected = "import ABC from '../components/nested/Baleada.js'"

  t.is(value, expected)
})
