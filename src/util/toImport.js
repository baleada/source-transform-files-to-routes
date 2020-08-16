export default function toImport ({ fileMetadata, importType }) {
  const { name, extension, path: { relativeFromRoot, relativeFromIndex, absolute }, id } = fileMetadata

  let dir
  switch (importType) {
  case 'absolute':
    dir = absolute
    break
  case 'relativeFromIndex':
    dir = relativeFromIndex
    break
  case 'relativeFromRoot':
    dir = relativeFromRoot
    break
  }

  return `import ${id} from '${dir}${name}.${extension}'`
}
