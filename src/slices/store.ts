import { configureStore } from "@reduxjs/toolkit";

import notesSlice from "./notes/notesSlice";
import uiSlice from "./ui/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    notes: notesSlice,
  },
});
