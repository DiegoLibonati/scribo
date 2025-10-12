import { Filter, Modal, Note } from "@src/entities/app";

export type UseNotesStore = {
  notes: Note[];
  notesFiltered: Note[];
  isFiltering: boolean;
  filters: Filter[];
  handleSetNotesFiltered: (search: string) => void;
  handleFilterChange: (idFilter: string) => void;
  handleSetNewNote: (note: Note) => void;
  handleRemoveNote: (idNote: string) => void;
};

export type UseUiStore = {
  modal: Modal;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
};
