import { Note } from "@src/entities/app";
import { UseNotesStore } from "@src/entities/hooks";

import { useAppDispatch, useAppSelector } from "@src/constants/redux";
import {
  filterChange,
  newNote,
  removeNote,
  setNotesFiltered,
} from "@src/slices/notes/notesSlice";

export const useNotesStore = (): UseNotesStore => {
  const dispatch = useAppDispatch();
  const { notes, notesFiltered, isFiltering, filters } = useAppSelector(
    (state) => state.notes
  );

  const handleSetNotesFiltered = (search: string) => {
    dispatch(setNotesFiltered(search));
  };

  const handleFilterChange = (idFilter: string) => {
    dispatch(filterChange(idFilter));
  };

  const handleSetNewNote = (note: Note): void => {
    dispatch(newNote(note));
  };

  const handleRemoveNote = (idNote: string): void => {
    dispatch(removeNote(idNote));
  };

  return {
    notes: notes,
    notesFiltered: notesFiltered,
    isFiltering: isFiltering,
    filters: filters,
    handleSetNotesFiltered: handleSetNotesFiltered,
    handleFilterChange: handleFilterChange,
    handleSetNewNote: handleSetNewNote,
    handleRemoveNote: handleRemoveNote,
  };
};
