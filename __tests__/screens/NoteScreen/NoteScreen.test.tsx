import { render, screen, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";

import type { RenderAPI } from "@testing-library/react-native";
import type { RootState } from "@/app/store";

import NoteScreen from "@/screens/NoteScreen/NoteScreen";

import { createTestStore } from "@tests/__mocks__/store.mock";
import { mockNote } from "@tests/__mocks__/notes.mock";

const mockNavigate = jest.fn();
let mockSearchParams: { id: string } = { id: "1" };

jest.mock(
  "expo-router",
  (): { useRouter: () => { navigate: jest.Mock }; useLocalSearchParams: () => { id: string } } => ({
    useRouter: (): { navigate: jest.Mock } => ({ navigate: mockNavigate }),
    useLocalSearchParams: (): { id: string } => mockSearchParams,
  })
);

const defaultFilters = [
  { id: "date", name: "Date", isActive: true },
  { id: "title", name: "Title", isActive: false },
  { id: "content", name: "Description", isActive: false },
];

const preloadedWithNote: Partial<RootState> = {
  notes: {
    notes: [mockNote],
    notesFiltered: [],
    isFiltering: false,
    filters: defaultFilters,
  },
};

const renderScreen = (preloadedState?: Partial<RootState>): RenderAPI =>
  render(
    <Provider store={createTestStore(preloadedState)}>
      <NoteScreen />
    </Provider>
  );

describe("NoteScreen", () => {
  beforeEach(() => {
    mockSearchParams = { id: "1" };
  });

  describe("rendering", () => {
    it("should render the note title when the note exists in the store", () => {
      renderScreen(preloadedWithNote);
      expect(screen.getByText("First Note")).toBeTruthy();
    });

    it("should render the note content when the note exists in the store", () => {
      renderScreen(preloadedWithNote);
      expect(screen.getByText("Content of first note")).toBeTruthy();
    });

    it("should render the note date when the note exists in the store", () => {
      renderScreen(preloadedWithNote);
      expect(screen.getByText("29 April")).toBeTruthy();
    });

    it("should render the remove button when the note exists", () => {
      renderScreen(preloadedWithNote);
      expect(screen.getByTestId("remove-note-1")).toBeTruthy();
    });

    it("should render the NavBar with a go back button", () => {
      renderScreen(preloadedWithNote);
      expect(screen.getByTestId("go-back")).toBeTruthy();
    });
  });

  describe("behavior", () => {
    it("should navigate to home when the note id does not match any note in the store", () => {
      mockSearchParams = { id: "nonexistent-id" };
      renderScreen(preloadedWithNote);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("should remove the note from the store when the remove button is pressed", () => {
      const store = createTestStore(preloadedWithNote);
      render(
        <Provider store={store}>
          <NoteScreen />
        </Provider>
      );
      fireEvent.press(screen.getByTestId("remove-note-1"));
      expect(store.getState().notes.notes).toHaveLength(0);
    });

    it("should navigate to home after removing the note", () => {
      renderScreen(preloadedWithNote);
      fireEvent.press(screen.getByTestId("remove-note-1"));
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  describe("edge cases", () => {
    it("should not navigate when no note id is provided", () => {
      mockSearchParams = { id: "" };
      renderScreen();
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("should render with empty values when note is not yet resolved", () => {
      mockSearchParams = { id: "" };
      renderScreen();
      expect(screen.queryByText("First Note")).toBeNull();
    });
  });
});
