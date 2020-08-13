import { parse, resolve } from 'path'
import { customAlphabet } from 'nanoid'
import { lowercase, uppercase } from 'nanoid-dictionary'

const nanoid = customAlphabet(`${lowercase}${uppercase}`, 21) // 21 is nanoid default

export default function toMetadata ({ dir, paths }) {
  const basePath = resolve(''),
        relativePathFromRoot = dir.replace(basePath, '').replace(/^\//, '')
        
  return paths.map(path => {
    const { name, ext } = parse(path)

    return {
      name,
      extension: ext.replace(/^\./, ''),
      relativePathFromIndex: '.' + path.replace(relativePathFromRoot, '').replace(name, '').replace(ext, ''),
      id: nanoid(),
    }
  })
}
