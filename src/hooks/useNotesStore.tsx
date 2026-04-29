import type { Note } from "@/types/app";
import type { UseNotesStore } from "@/types/hooks";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { filterChange, newNote, removeNote, setNotesFiltered } from "@/features/notes/notesSlice";

export const useNotesStore = (): UseNotesStore => {
  const dispatch = useAppDispatch();
  const { notes, notesFiltered, isFiltering, filters } = useAppSelector((state) => state.notes);

  const handleSetNotesFiltered = (search: string): void => {
    dispatch(setNotesFiltered(search));
  };

  const handleFilterChange = (idFilter: string): void => {
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
