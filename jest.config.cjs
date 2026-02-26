const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/jest.env.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  testMatch: ["<rootDir>/tests/**/*.test.(ts|tsx)", "<rootDir>/tests/**/*.spec.(ts|tsx)"],
  collectCoverage: true,
  collectCoverageFrom: ["app/**/*.{ts,tsx}", "!app/**/*.d.ts"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageReporters: ["text", "html"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
