import { createSlice } from "@reduxjs/toolkit";

import type { UiState } from "@/types/states";

const initialState: UiState = {
  modal: {
    isOpen: false,
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state) => {
      state.modal.isOpen = true;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;

export default uiSlice.reducer;
