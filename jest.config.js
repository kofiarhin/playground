module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'server/**/*.js',
    '!server/server.js',
    '!server/config/db.js',
    '!server/services/**/*.js',
    '!server/models/**/*.js'
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  }
};
