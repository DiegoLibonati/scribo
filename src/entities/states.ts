import { Filter, Modal, Note } from "@src/entities/app";

export type UiState = {
  modal: Modal;
};

export type NotesState = {
  notes: Note[];
  notesFiltered: Note[];
  isFiltering: boolean;
  filters: Filter[];
};
