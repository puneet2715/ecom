const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    // '^@/components/(.*)$': '<rootDir>/components/$1',
    // '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

/** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   transform: {
// '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
// '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
//     '^.+\\.tsx?$': [
//       'ts-jest',
//       {
//         tsconfig: './tsconfig.jest.json',
//       },
//     ],
//   },
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
//   testMatch: ['**/**/?(*.)+(spec|test).[tj]s?(x)'],
//   setupFilesAfterEnv: ['./src/jest.setup.ts'],
// };
