import { parse, resolve } from 'path'
import { clipable } from '@baleada/logic'
import { customAlphabet } from 'nanoid'
import { lowercase, uppercase } from 'nanoid-dictionary'

const nanoid = customAlphabet(`${lowercase}${uppercase}`, 21) // 21 is nanoid default

export default function toMetadata ({ filesDir, ids }) {
  return ids.map(id => {
    const { name, ext } = parse(id),
          fileRE = new RegExp(`${name}${ext}$`),
          basePath = resolve(''),
          relativeFromRoot = clipable(id)
            .clip(basePath)
            .clip(fileRE)
            .toString(),
          relativeFromIndex = '.' + clipable(id)
            .clip(filesDir)
            .clip(fileRE)
            .toString(),
          absolute = clipable(id)
            .clip(fileRE)
            .toString()

    return {
      name,
      extension: clipable(ext).clip(/^\./).toString(),
      path: {
        relativeFromRoot,
        relativeFromIndex,
        absolute,
      },
      id: nanoid()
    }
  })
}
