import { render, screen, fireEvent } from "@testing-library/react-native";

import type { RenderAPI } from "@testing-library/react-native";
import type { NoteProps } from "@/types/props";

import Note from "@/components/Note/Note";

const mockNavigate = jest.fn();

jest.mock("expo-router", (): { useRouter: () => { navigate: jest.Mock } } => ({
  useRouter: (): { navigate: jest.Mock } => ({ navigate: mockNavigate }),
}));

const renderComponent = (props: Partial<NoteProps> = {}): RenderAPI => {
  const defaultProps: NoteProps = {
    id: "1",
    date: "29 April",
    title: "My Note",
    content: "Note content here",
    ...props,
  };
  return render(<Note {...defaultProps} />);
};

describe("Note", () => {
  describe("rendering", () => {
    it("should render the note date", () => {
      renderComponent();
      expect(screen.getByText("29 April")).toBeTruthy();
    });

    it("should render the note title", () => {
      renderComponent();
      expect(screen.getByText("My Note")).toBeTruthy();
    });

    it("should render the note content", () => {
      renderComponent();
      expect(screen.getByText("Note content here")).toBeTruthy();
    });

    it("should render with a testID based on the note id", () => {
      renderComponent({ id: "42" });
      expect(screen.getByTestId("note-42")).toBeTruthy();
    });
  });

  describe("behavior", () => {
    it("should navigate to the note route when pressed", () => {
      renderComponent({ id: "1" });
      fireEvent.press(screen.getByTestId("note-1"));
      expect(mockNavigate).toHaveBeenCalledWith("/1");
    });

    it("should navigate with the correct dynamic id", () => {
      renderComponent({ id: "abc-123" });
      fireEvent.press(screen.getByTestId("note-abc-123"));
      expect(mockNavigate).toHaveBeenCalledWith("/abc-123");
    });

    it("should call navigate exactly once when pressed", () => {
      renderComponent({ id: "1" });
      fireEvent.press(screen.getByTestId("note-1"));
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
