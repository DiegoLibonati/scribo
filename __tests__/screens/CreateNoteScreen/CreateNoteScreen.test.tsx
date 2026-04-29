import { render, screen, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";

import type { RenderAPI } from "@testing-library/react-native";

import CreateNoteScreen from "@/screens/CreateNoteScreen/CreateNoteScreen";

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
      <CreateNoteScreen />
    </Provider>
  );

describe("CreateNoteScreen", () => {
  describe("rendering", () => {
    it("should render the title input", () => {
      renderScreen();
      expect(screen.getByPlaceholderText("Title...")).toBeTruthy();
    });

    it("should render the content input", () => {
      renderScreen();
      expect(screen.getByPlaceholderText("Content...")).toBeTruthy();
    });

    it("should render the create button", () => {
      renderScreen();
      expect(screen.getByText("Create")).toBeTruthy();
    });

    it("should render the NavBar with a go back button", () => {
      renderScreen();
      expect(screen.getByTestId("go-back")).toBeTruthy();
    });
  });

  describe("behavior", () => {
    it("should not navigate when both fields are empty", () => {
      renderScreen();
      fireEvent.press(screen.getByText("Create"));
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("should not navigate when only the title is provided", () => {
      renderScreen();
      fireEvent.changeText(screen.getByPlaceholderText("Title..."), "My Title");
      fireEvent.press(screen.getByText("Create"));
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("should not navigate when only the content is provided", () => {
      renderScreen();
      fireEvent.changeText(screen.getByPlaceholderText("Content..."), "My Content");
      fireEvent.press(screen.getByText("Create"));
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("should navigate to home after creating a note with valid data", () => {
      renderScreen();
      fireEvent.changeText(screen.getByPlaceholderText("Title..."), "My Title");
      fireEvent.changeText(screen.getByPlaceholderText("Content..."), "My Content");
      fireEvent.press(screen.getByText("Create"));
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("should add the new note to the store after a successful creation", () => {
      const store = createTestStore();
      render(
        <Provider store={store}>
          <CreateNoteScreen />
        </Provider>
      );
      fireEvent.changeText(screen.getByPlaceholderText("Title..."), "My Title");
      fireEvent.changeText(screen.getByPlaceholderText("Content..."), "My Content");
      fireEvent.press(screen.getByText("Create"));
      expect(store.getState().notes.notes).toHaveLength(1);
      expect(store.getState().notes.notes[0]!.title).toBe("My Title");
      expect(store.getState().notes.notes[0]!.content).toBe("My Content");
    });
  });

  describe("edge cases", () => {
    it("should not navigate when the title is only whitespace", () => {
      renderScreen();
      fireEvent.changeText(screen.getByPlaceholderText("Title..."), "   ");
      fireEvent.changeText(screen.getByPlaceholderText("Content..."), "My Content");
      fireEvent.press(screen.getByText("Create"));
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("should not navigate when the content is only whitespace", () => {
      renderScreen();
      fireEvent.changeText(screen.getByPlaceholderText("Title..."), "My Title");
      fireEvent.changeText(screen.getByPlaceholderText("Content..."), "   ");
      fireEvent.press(screen.getByText("Create"));
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
