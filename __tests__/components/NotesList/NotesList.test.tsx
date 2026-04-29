import { render, screen } from "@testing-library/react-native";
import { Provider } from "react-redux";

import type { RenderAPI } from "@testing-library/react-native";
import type { RootState } from "@/app/store";

import NotesList from "@/components/NotesList/NotesList";

import { createTestStore } from "@tests/__mocks__/store.mock";
import { mockNote, mockNotes } from "@tests/__mocks__/notes.mock";

const mockNavigate = jest.fn();

jest.mock("expo-router", (): { useRouter: () => { navigate: jest.Mock } } => ({
  useRouter: (): { navigate: jest.Mock } => ({ navigate: mockNavigate }),
}));

const defaultFilters = [
  { id: "date", name: "Date", isActive: true },
  { id: "title", name: "Title", isActive: false },
  { id: "content", name: "Description", isActive: false },
];

const renderComponent = (preloadedState?: Partial<RootState>): RenderAPI =>
  render(
    <Provider store={createTestStore(preloadedState)}>
      <NotesList />
    </Provider>
  );

describe("NotesList", () => {
  describe("rendering", () => {
    it("should show the empty state message when there are no notes and not filtering", () => {
      renderComponent();
      expect(screen.getByText("You still don't have notes created.")).toBeTruthy();
    });

    it("should render notes from the store when notes exist", () => {
      renderComponent({
        notes: { notes: mockNotes, notesFiltered: [], isFiltering: false, filters: defaultFilters },
      });
      expect(screen.getByText("First Note")).toBeTruthy();
      expect(screen.getByText("Second Note")).toBeTruthy();
    });

    it("should render note content when notes exist", () => {
      renderComponent({
        notes: { notes: mockNotes, notesFiltered: [], isFiltering: false, filters: defaultFilters },
      });
      expect(screen.getByText("Content of first note")).toBeTruthy();
    });

    it("should show the no results message when filtering with no matching notes", () => {
      renderComponent({
        notes: {
          notes: mockNotes,
          notesFiltered: [],
          isFiltering: true,
          filters: defaultFilters,
        },
      });
      expect(screen.getByText("No notes found.")).toBeTruthy();
    });

    it("should render filtered notes when filtering returns results", () => {
      renderComponent({
        notes: {
          notes: mockNotes,
          notesFiltered: [mockNote],
          isFiltering: true,
          filters: defaultFilters,
        },
      });
      expect(screen.getByText("First Note")).toBeTruthy();
      expect(screen.queryByText("Second Note")).toBeNull();
    });
  });

  describe("edge cases", () => {
    it("should not show the empty state message when notes exist", () => {
      renderComponent({
        notes: { notes: mockNotes, notesFiltered: [], isFiltering: false, filters: defaultFilters },
      });
      expect(screen.queryByText("You still don't have notes created.")).toBeNull();
    });
  });
});
