module.exports = {
  preset: "jest-expo",
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
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
};
