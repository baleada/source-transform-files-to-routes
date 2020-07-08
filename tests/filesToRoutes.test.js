import test from 'ava'
import filesToRoutes, { toPaths, toFormattedRoute } from '../src'

const pathToFiles = {
  absolute: 'tests/stubs/files',
  relativeFromRoutes: '../example/path',
}


test('transforms files to Vue routes', t => {
  const routes = filesToRoutes({ router: 'vue', pathToFiles }),
        expected = `export default [${toPaths}]`
})