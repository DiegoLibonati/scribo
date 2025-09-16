import { configureStore } from "@reduxjs/toolkit";

import notesSlice from "@src/slices/notes/notesSlice";
import uiSlice from "@src/slices/ui/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    notes: notesSlice,
  },
});
