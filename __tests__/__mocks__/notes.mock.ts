import type { Note } from "@/types/app";

export const mockNotes: Note[] = [
  { id: "1", date: "29 April", title: "First Note", content: "Content of first note" },
  { id: "2", date: "28 April", title: "Second Note", content: "Content of second note" },
];

export const mockNote: Note = mockNotes[0]!;
