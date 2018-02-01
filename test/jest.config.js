module.exports = {
  // env
  testEnvironment: 'node',
  bail: false,
  verbose: false,

  // go from root
  rootDir: '../../',
  testMatch: ['**/test/api/**/*.js?(x)', '**/test/unit/**/*.js?(x)'],

  // setup
  setupFiles: ['<rootDir>/test/support/setup'],
  setupTestFrameworkScriptFile: '<rootDir>/test/support/setup-framework',

  // coverage
  collectCoverage: true,
  coverageDirectory: 'test/coverage/all',
  collectCoverageFrom: [
    'api/**/*.js',
    'config/**/*.js',
    'core/**/*.js',
    'database/**/*.js',
    'logs/**/*.js',
    'model/**/*.js',
    'storage/**/*.js',
    'utils/**/*.js'
  ]
}
