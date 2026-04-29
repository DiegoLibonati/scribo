import type { Filter, Modal, Note } from "@/types/app";

export interface UiState {
  modal: Modal;
}

export interface NotesState {
  notes: Note[];
  notesFiltered: Note[];
  isFiltering: boolean;
  filters: Filter[];
}
