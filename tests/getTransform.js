import test from 'ava'
import getTransform from '../src'
import { toIds, toMetadata, toImport, toRoute } from '../src/util'

const routerStub = 'vue'

test('returns a function that transforms files to an index', t => {
  const filesToRoutes = getTransform(routerStub),
        value = filesToRoutes({ id: 'tests/stubs/files/routes.js' }),
        metadata = toMetadata({
          dir: 'tests/stubs/files',
          paths: toIds({ dir: 'tests/stubs/files', include: ['*'], exclude: [] })
        }),
        imports = metadata.map(toImport).join('\n') + '\n',
        routes = metadata.map(fileMetadata => toRoute({ fileMetadata, router: routerStub })).join(','),
        expected = `${imports}export default [${routes}]`

  console.log(value)

  t.is(value, expected)
})
