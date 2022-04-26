// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  moduleDirectories: ["node_modules", "src"],
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
}

module.exports = createJestConfig(customJestConfig)
