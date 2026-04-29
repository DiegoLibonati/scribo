import { configureStore } from "@reduxjs/toolkit";

import type { RootState, store } from "@/app/store";

import notesReducer from "@/features/notes/notesSlice";
import uiReducer from "@/features/ui/uiSlice";

export const createTestStore = (preloadedState?: Partial<RootState>): typeof store =>
  configureStore({
    reducer: {
      ui: uiReducer,
      notes: notesReducer,
    },
    preloadedState,
  });
