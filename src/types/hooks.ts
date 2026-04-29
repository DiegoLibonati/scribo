import type { Filter, Modal, Note } from "@/types/app";

export interface UseNotesStore {
  notes: Note[];
  notesFiltered: Note[];
  isFiltering: boolean;
  filters: Filter[];
  handleSetNotesFiltered: (search: string) => void;
  handleFilterChange: (idFilter: string) => void;
  handleSetNewNote: (note: Note) => void;
  handleRemoveNote: (idNote: string) => void;
}

export interface UseUiStore {
  modal: Modal;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}
