import "@testing-library/jest-native/extend-expect";

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    Ionicons: (props: any) =>
      React.createElement("svg", { ...props }, React.createElement("path")),
  };
});
