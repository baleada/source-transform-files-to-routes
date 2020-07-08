export default {
  files: [ 'tests/**/*.test.js' ],
  verbose: true,
  require: [
    './tests/test-util/setup.js'
  ],
  babel: {
    compileAsTests: [
      'src/**/*.js',
      'tests/test-util/*.js',
      'tests/stubs/*.js',
    ],
    testOptions: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: true,
            },
          },
        ],
      ],
    }
  }
}
