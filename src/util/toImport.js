export default function toImport (fileMetadata) {
  const { id, name, extension, relativePathFromIndex } = fileMetadata
  return `import ${id} from '${relativePathFromIndex}${name}.${extension}'`
}