import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Note } from "@src/entities/app";
import { NotesState } from "@src/entities/states";

const initialState: NotesState = {
  notes: [],
  notesFiltered: [],
  isFiltering: false,
  filters: [
    {
      id: "date",
      name: "Date",
      isActive: true,
    },
    { id: "title", name: "Title", isActive: false },
    { id: "content", name: "Description", isActive: false },
  ],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotesFiltered: (state, action: PayloadAction<string>) => {
      const search = action.payload.toLowerCase();
      state.isFiltering = true;

      if (!search) {
        state.isFiltering = false;
        state.notesFiltered = [];
        return;
      }

      const filterBy = state.filters.find((filter) => filter.isActive)?.id;

      state.notesFiltered = state.notes.filter((note) =>
        note[filterBy as keyof Note].toLowerCase().includes(search)
      );
    },
    filterChange: (state, action: PayloadAction<string>) => {
      const idActiveFilter = action.payload;

      state.filters = state.filters.map((filter) => {
        if (filter.isActive) filter.isActive = false;
        if (filter.id === idActiveFilter) filter.isActive = true;

        return filter;
      });
    },
    newNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    removeNote: (state, action: PayloadAction<string>) => {
      const idNote = action.payload;

      state.notes = state.notes.filter((note) => note.id !== idNote);
    },
  },
});

export const { setNotesFiltered, filterChange, newNote, removeNote } =
  notesSlice.actions;

export default notesSlice.reducer;
