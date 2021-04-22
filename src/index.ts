// import { toFilesDir, toIds, toMetadata, toImport, toRoute } from './util'
import { resolve } from 'path'
import {
  ensureTest,
  toFileMetadata,
  toFileIds
} from './util'
import type { FilterPattern } from '@rollup/pluginutils'

const basePath = resolve('')


export type Options = {
  include?: FilterPattern,
  exclude?: FilterPattern,
  test?: (api?: TestApi) => boolean,
  transformPath?: (path: string) => string,
  importPath?: 'absolute' | 'relativeFromImportingFile' | 'relativeFromProjectRoot',
  importType?: 'static' | 'dynamic',
}

type TestApi = {
  id?: string,
}

const defaultOptions: Options = {
  include: '**',
  exclude: '**/.**',
  transformPath: path => path,
  importPath: 'absolute',
  importType: 'dynamic',
}

export function filesToRoutes ({ router, dir }, options: Options = {}) {
  const { include, exclude, test: rawTest, transformPath, importPath, importType } = { ...defaultOptions, ...options },
        test = ensureTest({ include, exclude, rawTest })

  const ids = toFileIds({ dir }).filter(id => test({ id })),
        metadata = ids.map(id => toFileMetadata({ id, importingFileDir: dir }),
        imports = metadata.map(fileMetadata => toImport({ fileMetadata, importPath, importType })).join('\n') + '\n',
        routes = metadata.map(fileMetadata => toRoute({ fileMetadata, router, transformPath })).join(',')
    
  return `${imports}export default [${routes}]`
}
