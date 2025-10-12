import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";

import { NotesRouter } from "./src/router/NotesRouter";
import { store } from "./src/slices/store";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <NativeRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <NotesRouter></NotesRouter>
      </NativeRouter>
    </Provider>
  );
}
