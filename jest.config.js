/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/cypress"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
}
