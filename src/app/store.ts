import { configureStore } from "@reduxjs/toolkit";

import notesSlice from "@src/features/notes/notesSlice";
import uiSlice from "@src/features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    notes: notesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
