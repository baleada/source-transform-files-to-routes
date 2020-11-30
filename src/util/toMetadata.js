import { parse, resolve } from 'path'
import { customAlphabet } from 'nanoid'
import { lowercase, uppercase } from 'nanoid-dictionary'

const nanoid = customAlphabet(`${lowercase}${uppercase}`, 21) // 21 is nanoid default

export default function toMetadata ({ filesDir, ids }) {
  return ids.map(id => {
    const { name, ext } = parse(id),
          fileRE = new RegExp(`${name}${ext}$`),
          basePath = resolve(''),
          relativeFromRoot = id
            .replace(basePath, '')
            .replace(fileRE, ''),
          relativeFromIndex = '.' + id
            .replace(filesDir, '')
            .replace(fileRE, ''),
          absolute = (() => {
            const withoutFile = id.replace(fileRE, '')
            return withoutFile.startsWith(basePath) ? withoutFile : `${basePath}/${withoutFile}`
          })()

    return {
      name,
      extension: ext.replace(/^\./, ''),
      path: {
        relativeFromRoot,
        relativeFromIndex,
        absolute,
      },
      id: nanoid()
    }
  })
}
