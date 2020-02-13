const pkg = require('./package');

module.exports = {
  rootDir: './',
  name: pkg.name,
  displayName: pkg.name.toUpperCase(),
  testPathIgnorePatterns: ['/node_modules/', './build'],
  coverageReporters: ['lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTestFramework.js'],
  globalSetup: '<rootDir>/test/setup.js',
  globalTeardown: '<rootDir>/test/teardown.js',
  resetModules: false,
  reporters: ['default'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': '<rootDir>/test/babel-transformer',
    '\\.svg$': '<rootDir>/test/fileTransformer.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|css|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/binaryFile.js',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts|tsx)?$',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|draft-js|react-clone-referenced-element|react-navigation|react-native-router-flux))',
  ],
};
