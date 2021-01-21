export default function toImport ({ fileMetadata, importType, importPath }) {
  const { name, extension, path: { relativeFromRoot, relativeFromIndex, absolute }, id } = fileMetadata

  const dir = (() => {
          switch (importPath) {
            case 'absolute':
              return absolute
            case 'relativeFromIndex':
              return relativeFromIndex
            case 'relativeFromRoot':
              return relativeFromRoot
            }
        })()
  
  switch (importType) {
    case 'dynamic':
      return `const ${id} = () => import('${dir}${name}.${extension}')`
    case 'static':
      return `import ${id} from '${dir}${name}.${extension}'`
  }
}
