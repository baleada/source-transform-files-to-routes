import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

export default {
  external: [
    'fs',
  ],
  input: [
    'src/index.js',
  ],
  output: { file: 'lib/index.js', format: 'cjs' },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
  ]
}
