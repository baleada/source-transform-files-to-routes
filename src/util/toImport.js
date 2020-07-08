export default function toImport (fileMetadata) {
  const { id, name, extension, path: { relativeFromRoutes, relativeFromFiles } } = fileMetadata
  return `import ${id} from '${relativeFromRoutes}${relativeFromFiles}${name}.${extension}'`
}