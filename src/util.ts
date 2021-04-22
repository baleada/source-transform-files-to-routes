import { 
  readdirSync, 
  statSync,
  existsSync,
} from 'fs'
import { parse, resolve } from 'path'
import type { Options } from './index'
import { createFilter } from '@rollup/pluginutils'

/**
 * Given a directory, retrieves the IDs of all items, including nested items, in the directory.
 */
export function toIds ({ dir }: { dir: string }): string[] {
  return readdirSync(dir)
    .reduce((ids, item) => {
      return [
        ...ids,
        `${dir}/${item}`,
        ...(isFile({ dir, item }) ? [] : toIds({ dir: `${dir}/${item}` }))
      ]
    }, [])
}

function isFile ({ dir, item }: { dir: string, item: string }): boolean {
  return statSync(`${dir}/${item}`).isFile()
}


/**
 * Given a directory, retrieves the ids of all files and nested files in the directory.
 */
export function toFileIds ({ dir }: { dir: string }): string[] {
  return toIds({ dir }).filter(item => statSync(item).isFile())
}


/**
 * Given a directory, retrieves the ids of all directories and nested directories in the directory.
 */
export function toDirIds ({ dir }: { dir: string }): string[] {
  return toIds({ dir }).filter(item => statSync(item).isDirectory())
}


/**
 * Retrieves metadata about a file
 */
type FileMetadata = {
  id: string,
  name: string,
  extension: string,
  relativePaths: {
    fromProjectRoot: string,
    fromImportingFile: string,
    fromSystemRoot: string,
  }
}

export function toFileMetadata ({ id, importingFileDir }: { id: string, importingFileDir: string }): FileMetadata {
  const basePath = resolve(''),
        { name, ext } = parse(id),
        fileRE = new RegExp(`${name}${ext}$`),
        relativePathFromProjectRoot = id
          .replace(basePath, '')
          .replace(fileRE, ''),
        relativePathFromImportingFile = '.' + id
          .replace(importingFileDir, '')
          .replace(fileRE, ''),
        relativePathFromSystemRoot = id
          .replace(fileRE, '')

    return {
      id,
      name,
      extension: ext.replace(/^\./, ''),
      relativePaths: {
        fromProjectRoot: relativePathFromProjectRoot,
        fromImportingFile: relativePathFromImportingFile,
        fromSystemRoot: relativePathFromSystemRoot,
      }
    }
}


/**
 * Given a path or a fuzzy path to a file, returns the ID of the directory containing that file.
 */
export function toInducedDir ({ id }: { id: string }): string {
  switch (looksLike({ id })) {
    case 'file':
      return fromFile({ id })
    case 'dir':
      // If it looks like a dir and exists, it's a dir.

      // If it looks like a dir but doesn't exist, it's a
      // fuzzy path to a virtual file
      return existsSync(id) ? id : fromFile({ id })
  }
}

// index.js looks like a file
// index looks like a dir but might be a file
function looksLike ({ id }: { id: string }): 'file' | 'dir' {
  const { base, ext } = parse(id)
  return (base && ext) ? 'file' : 'dir'
}

function fromFile ({ id }: { id: string }): string {
  const { base } = parse(id),
        baseRE = new RegExp(`/${base}$`)
  return id.replace(baseRE, '')
}

export function toImport ({ fileMetadata, importType, importPath }: { fileMetadata: FileMetadata, importType: Options['importType'], importPath: Options['importPath'] }): string {
  const { name, extension, relativePaths: { fromProjectRoot, fromImportingFile, fromSystemRoot }, id } = fileMetadata

  const dir = (() => {
          switch (importPath) {
            case 'absolute':
              return fromSystemRoot
            case 'relativeFromProjectRoot':
              return fromProjectRoot
            }
        })()
  
  switch (importType) {
    case 'dynamic':
      return `const ${id} = () => import('${dir}${name}.${extension}')`
    case 'static':
      return `import ${id} from '${dir}${name}.${extension}'`
  }
}

export function ensureTest ({ include, exclude, rawTest }: { include?: Options['include'], exclude?: Options['exclude'], rawTest?: Options['test'] }): Options['test'] {
  if (typeof rawTest === 'function') {
    return rawTest
  }

  const filter = createFilter(include, exclude)
  return ({ id }) => filter(id)
}
