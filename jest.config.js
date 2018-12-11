module.exports = {
    preset: 'ts-jest',
    watchPathIgnorePatterns: ['/__test-cache/', '.+fixtures.+'],
    coveragePathIgnorePatterns: ['node_modules'],
    testEnvironment: 'node',
    
    globals: {
      'ts-jest': {
        diagnostics: {
          ignoreCodes: [151001],
        },
      },
    },
  };