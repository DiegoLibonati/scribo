import type { Config } from "jest";

const config: Config = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native" +
      "|@react-native(-community)?" +
      "|react-redux" +
      "|react-router-native" +
      "|expo(nent)?" +
      "|@expo(nent)?/.*" +
      "|@expo-google-fonts/.*" +
      "|react-navigation" +
      "|@react-navigation/.*" +
      "|expo-status-bar" +
      "|@sentry/react-native" +
      "|native-base" +
      "|react-native-svg" +
      "|@reduxjs/toolkit" +
      "|immer" +
      "))",
  ],
};

export default config;
