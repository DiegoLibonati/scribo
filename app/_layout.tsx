import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import type { JSX } from "react";

import { store } from "@/app/store";

export default function RootLayout(): JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Slot />
    </Provider>
  );
}
