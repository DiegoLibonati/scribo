import { render, screen, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";

import type { RenderAPI } from "@testing-library/react-native";

import NotesScreen from "@/screens/NotesScreen/NotesScreen";

import { createTestStore } from "@tests/__mocks__/store.mock";

const mockNavigate = jest.fn();

jest.mock(
  "expo-router",
  (): {
    useRouter: () => { navigate: jest.Mock };
    useLocalSearchParams: () => Record<string, string>;
  } => ({
    useRouter: (): { navigate: jest.Mock } => ({ navigate: mockNavigate }),
    useLocalSearchParams: (): Record<string, string> => ({}),
  })
);

const renderScreen = (): RenderAPI =>
  render(
    <Provider store={createTestStore()}>
      <NotesScreen />
    </Provider>
  );

describe("NotesScreen", () => {
  describe("rendering", () => {
    it("should render the NavBar title", () => {
      renderScreen();
      expect(screen.getByText("Notes App")).toBeTruthy();
    });

    it("should render the filter button in the NavBar", () => {
      renderScreen();
      expect(screen.getByTestId("open-filters")).toBeTruthy();
    });

    it("should render the search input", () => {
      renderScreen();
      expect(screen.getByPlaceholderText("Search note...")).toBeTruthy();
    });

    it("should render the create new note button", () => {
      renderScreen();
      expect(screen.getByTestId("create-new-note")).toBeTruthy();
    });

    it("should show the empty notes message when there are no notes", () => {
      renderScreen();
      expect(screen.getByText("You still don't have notes created.")).toBeTruthy();
    });
  });

  describe("behavior", () => {
    it("should navigate to the new note screen when the create button is pressed", () => {
      renderScreen();
      fireEvent.press(screen.getByTestId("create-new-note"));
      expect(mockNavigate).toHaveBeenCalledWith("/new");
    });

    it("should navigate exactly once when the create button is pressed", () => {
      renderScreen();
      fireEvent.press(screen.getByTestId("create-new-note"));
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it("should open the filter modal in the store when the filter button is pressed", () => {
      const store = createTestStore();
      render(
        <Provider store={store}>
          <NotesScreen />
        </Provider>
      );
      fireEvent.press(screen.getByTestId("open-filters"));
      expect(store.getState().ui.modal.isOpen).toBe(true);
    });
  });
});
