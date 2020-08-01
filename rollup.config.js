import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

export default {
  external: [
    'fs',
    'path',
    '@rollup/pluginutils',
    'nanoid',
    'nanoid-dictionary',
  ],
  input: [
    'src/index.js',
  ],
  output: [
    { file: 'lib/index.js', format: 'cjs' },
    { file: 'lib/index.esm.js', format: 'esm' },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
  ]
}
