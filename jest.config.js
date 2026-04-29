/** @type {import('jest').Config} */
const config = {
  preset: "jest-expo",
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
  setupFilesAfterEnv: ["<rootDir>/__tests__/jest.setup.ts"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
  moduleNameMapper: {
    "^@expo/vector-icons(.*)$": "<rootDir>/__tests__/__mocks__/vector-icons.mock.ts",
    "^expo-constants$": "<rootDir>/__tests__/__mocks__/constants.mock.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/__tests__/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(-[^/]*)?|@expo(-[^/]*)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|react-native-svg|native-base|react-redux|@reduxjs/toolkit|immer))",
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/types/**/*.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
};

export default config;
