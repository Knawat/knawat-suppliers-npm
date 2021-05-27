module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  moduleFileExtensions: ['js'],
  testMatch: ['**/*.spec.ts'],
  testMatch: ['<rootDir>/test/**/*.spec.js'],
  testPathIgnorePatterns: ['<rootDir>/test/setup.js'],
};
