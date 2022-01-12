/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/node_modules/",
    "/cypress"
  ],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json"
    }
  }
};